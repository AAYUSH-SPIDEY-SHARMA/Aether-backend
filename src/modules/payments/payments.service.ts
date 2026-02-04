// Payments Service - Updated for Event-Centric Registration
// Works with public registration (no userId required)

import { razorpay } from '../../config/razorpay.js';
import { prisma } from '../../config/prisma.js';
import { PaymentStatus } from '@prisma/client';
import { AppError } from '../../middlewares/error.middleware.js';
import { logger } from '../../utils/logger.js';
import { linkRazorpayOrder } from '../registration/registration.service.js';
import { sendPaymentSuccessEmail, sendPaymentFailedEmail } from '../../utils/email.js';

interface CreateOrderInput {
    registrationId: string;
}

interface RazorpayWebhookPayload {
    event: string;
    payload: {
        payment?: {
            entity: {
                id: string;
                order_id: string;
                status: string;
                amount: number;
            };
        };
        order?: {
            entity: {
                id: string;
                status: string;
            };
        };
    };
}

// Create Razorpay order (PUBLIC - no auth required)
export async function createOrder(input: CreateOrderInput) {
    const { registrationId } = input;

    // Get registration
    const registration = await prisma.registration.findUnique({
        where: { id: registrationId },
        include: {
            event: true,
            participants: {
                where: { isLeader: true },
                select: { fullName: true, email: true },
            },
        },
    });

    if (!registration) {
        throw new AppError('Registration not found', 404);
    }

    // Check if already paid
    if (registration.status === PaymentStatus.SUCCESS) {
        throw new AppError('Payment already completed', 400);
    }

    // If already has order, return existing
    if (registration.razorpayOrderId) {
        try {
            const existingOrder = await razorpay.orders.fetch(registration.razorpayOrderId);
            if (existingOrder.status !== 'paid') {
                return {
                    orderId: existingOrder.id,
                    amount: existingOrder.amount,
                    currency: existingOrder.currency,
                    registrationId: registration.id,
                    keyId: process.env.RAZORPAY_KEY_ID,
                };
            }
        } catch {
            // Order not found, create new one
        }
    }

    // Handle free events
    if (registration.amount === 0) {
        await prisma.registration.update({
            where: { id: registrationId },
            data: {
                status: PaymentStatus.SUCCESS,
                paidAt: new Date(),
            },
        });

        return {
            orderId: null,
            amount: 0,
            currency: 'INR',
            registrationId: registration.id,
            isFree: true,
        };
    }

    const leader = registration.participants[0];

    // Create new Razorpay order
    const order = await razorpay.orders.create({
        amount: registration.amount * 100, // Convert to paise
        currency: 'INR',
        receipt: registrationId,
        notes: {
            registrationId,
            eventId: registration.eventId,
            eventTitle: registration.event.title,
            teamName: registration.teamName,
            leaderName: leader?.fullName || 'Unknown',
            leaderEmail: leader?.email || registration.createdByEmail || 'Unknown',
        },
    });

    // Link order to registration
    await linkRazorpayOrder(registrationId, order.id);

    logger.info(`Razorpay order created: ${order.id}`, { registrationId });

    return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        registrationId: registration.id,
        keyId: process.env.RAZORPAY_KEY_ID,
    };
}

// Process webhook from Razorpay
export async function processWebhook(payload: RazorpayWebhookPayload) {
    const { event } = payload;

    logger.info(`Razorpay webhook received: ${event}`);

    switch (event) {
        case 'payment.captured':
        case 'payment.authorized':
            await handlePaymentSuccess(payload);
            break;

        case 'payment.failed':
            await handlePaymentFailed(payload);
            break;

        case 'order.paid':
            await handleOrderPaid(payload);
            break;

        default:
            logger.info(`Unhandled webhook event: ${event}`);
    }
}

// Handle successful payment
async function handlePaymentSuccess(payload: RazorpayWebhookPayload) {
    const payment = payload.payload.payment?.entity;
    if (!payment) return;

    const { id: paymentId, order_id: orderId } = payment;

    const registration = await prisma.registration.findUnique({
        where: { razorpayOrderId: orderId },
    });

    if (!registration) {
        logger.error(`Registration not found for order: ${orderId}`);
        return;
    }

    if (registration.status !== PaymentStatus.SUCCESS) {
        await prisma.registration.update({
            where: { id: registration.id },
            data: {
                status: PaymentStatus.SUCCESS,
                razorpayPaymentId: paymentId,
                paidAt: new Date(),
            },
        });

        logger.info(`Payment successful: ${paymentId}`, {
            registrationId: registration.id,
            orderId,
        });

        // Send confirmation email to leader
        sendPaymentSuccessEmail(registration.id).catch(err => {
            logger.error('Failed to send success email:', { err, registrationId: registration.id });
        });
    }
}

// Handle failed payment
async function handlePaymentFailed(payload: RazorpayWebhookPayload) {
    const payment = payload.payload.payment?.entity;
    if (!payment) return;

    const { id: paymentId, order_id: orderId } = payment;

    const registration = await prisma.registration.findUnique({
        where: { razorpayOrderId: orderId },
    });

    if (!registration) {
        logger.error(`Registration not found for order: ${orderId}`);
        return;
    }

    if (registration.status === PaymentStatus.PENDING) {
        await prisma.registration.update({
            where: { id: registration.id },
            data: {
                status: PaymentStatus.FAILED,
                razorpayPaymentId: paymentId,
            },
        });

        logger.warn(`Payment failed: ${paymentId}`, {
            registrationId: registration.id,
            orderId,
        });

        // Send failure email to leader
        sendPaymentFailedEmail(registration.id).catch(err => {
            logger.error('Failed to send failure email:', { err, registrationId: registration.id });
        });
    }
}

// Handle order.paid event
async function handleOrderPaid(payload: RazorpayWebhookPayload) {
    const order = payload.payload.order?.entity;
    if (!order) return;

    const registration = await prisma.registration.findUnique({
        where: { razorpayOrderId: order.id },
    });

    if (!registration) {
        logger.error(`Registration not found for order: ${order.id}`);
        return;
    }

    if (registration.status !== PaymentStatus.SUCCESS) {
        await prisma.registration.update({
            where: { id: registration.id },
            data: {
                status: PaymentStatus.SUCCESS,
                paidAt: new Date(),
            },
        });

        logger.info(`Order paid: ${order.id}`, { registrationId: registration.id });
    }
}

// Verify payment status (PUBLIC - for polling)
export async function verifyPayment(orderId: string) {
    const registration = await prisma.registration.findUnique({
        where: { razorpayOrderId: orderId },
        select: {
            id: true,
            status: true,
            teamName: true,
            razorpayOrderId: true,
            razorpayPaymentId: true,
            paidAt: true,
            event: {
                select: { id: true, title: true },
            },
        },
    });

    if (!registration) {
        throw new AppError('Order not found', 404);
    }

    return registration;
}

// Confirm payment manually (when webhook is slow)
// Verifies payment with Razorpay API and updates registration
export async function confirmPaymentManually(input: {
    orderId: string;
    paymentId: string;
    registrationId: string;
}) {
    const { orderId, paymentId, registrationId } = input;

    // Find registration
    const registration = await prisma.registration.findUnique({
        where: { id: registrationId },
        include: { event: { select: { id: true, title: true } } },
    });

    if (!registration) {
        throw new AppError('Registration not found', 404);
    }

    // Already successful, no need to verify again
    if (registration.status === PaymentStatus.SUCCESS) {
        return {
            status: 'SUCCESS',
            registrationId: registration.id,
            event: registration.event,
            teamName: registration.teamName,
            paidAt: registration.paidAt,
        };
    }

    // Verify order ID matches
    if (registration.razorpayOrderId !== orderId) {
        throw new AppError('Order ID mismatch', 400);
    }

    try {
        // Fetch payment from Razorpay to verify
        const payment = await razorpay.payments.fetch(paymentId);

        logger.info('Razorpay payment fetched for verification:', {
            paymentId,
            status: payment.status,
            orderId: payment.order_id
        });

        // Verify the payment belongs to this order
        if (payment.order_id !== orderId) {
            throw new AppError('Payment does not match order', 400);
        }

        // Check payment status from Razorpay
        if (payment.status === 'captured' || payment.status === 'authorized') {
            // Update registration to success
            await prisma.registration.update({
                where: { id: registrationId },
                data: {
                    status: PaymentStatus.SUCCESS,
                    razorpayPaymentId: paymentId,
                    paidAt: new Date(),
                },
            });

            logger.info(`Payment confirmed manually: ${paymentId}`, {
                registrationId,
                orderId,
            });

            // Send confirmation email to leader
            sendPaymentSuccessEmail(registrationId).catch(err => {
                logger.error('Failed to send success email (confirm):', { err, registrationId });
            });

            return {
                status: 'SUCCESS',
                registrationId: registration.id,
                event: registration.event,
                teamName: registration.teamName,
                paidAt: new Date(),
            };
        } else if (payment.status === 'failed') {
            // Update registration to failed
            await prisma.registration.update({
                where: { id: registrationId },
                data: {
                    status: PaymentStatus.FAILED,
                    razorpayPaymentId: paymentId,
                },
            });

            // Send failure email to leader
            sendPaymentFailedEmail(registrationId).catch(err => {
                logger.error('Failed to send failure email (confirm):', { err, registrationId });
            });

            return {
                status: 'FAILED',
                registrationId: registration.id,
            };
        } else {
            // Payment still processing
            return {
                status: 'PROCESSING',
                registrationId: registration.id,
                razorpayStatus: payment.status,
            };
        }
    } catch (error: any) {
        // If Razorpay API fails, return current status
        logger.error('Failed to verify payment with Razorpay:', { error: error.message });

        return {
            status: registration.status,
            registrationId: registration.id,
            error: 'Could not verify with Razorpay',
        };
    }
}

