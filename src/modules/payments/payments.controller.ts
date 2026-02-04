// Payments Controller - Public endpoints

import { Request, Response, NextFunction } from 'express';
import * as paymentsService from './payments.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { logger } from '../../utils/logger.js';

// POST /payments/create-order (PUBLIC - no auth required)
export async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { registrationId } = req.body;

        if (!registrationId) {
            res.status(400).json({ success: false, message: 'registrationId required' });
            return;
        }

        const order = await paymentsService.createOrder({ registrationId });
        sendCreated(res, order, 'Order created');
    } catch (error) {
        next(error);
    }
}

// POST /payments/webhook (Razorpay callback - signature verified)
export async function webhook(
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> {
    try {
        await paymentsService.processWebhook(req.body);
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        logger.error('Webhook processing error:', { error });
        res.status(200).json({ status: 'ok' });
    }
}

// GET /payments/verify/:orderId (PUBLIC - for polling)
export async function verifyPayment(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await paymentsService.verifyPayment(req.params.orderId);
        sendSuccess(res, result, 'Payment status retrieved');
    } catch (error) {
        next(error);
    }
}

// POST /payments/confirm (PUBLIC - confirms payment with Razorpay API)
// This is used when webhook is slow - frontend calls this after payment success
export async function confirmPayment(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { orderId, paymentId, registrationId } = req.body;

        if (!orderId || !paymentId || !registrationId) {
            res.status(400).json({
                success: false,
                message: 'orderId, paymentId, and registrationId are required'
            });
            return;
        }

        const result = await paymentsService.confirmPaymentManually({
            orderId,
            paymentId,
            registrationId
        });
        sendSuccess(res, result, 'Payment confirmed');
    } catch (error) {
        next(error);
    }
}

