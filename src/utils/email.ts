// Email Service Utility
// Handles sending branded emails via Resend

import { Resend } from 'resend';
import { render } from '@react-email/components';
import { prisma } from '../config/prisma.js';
import { logger } from './logger.js';
import PaymentSuccessEmail from '../emails/templates/PaymentSuccessEmail.js';
import PaymentFailedEmail from '../emails/templates/PaymentFailedEmail.js';
import PendingReminderEmail from '../emails/templates/PendingReminderEmail.js';
import React from 'react';

// Initialize Resend - optional to prevent crash if API key missing
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY && RESEND_API_KEY.length > 0
    ? new Resend(RESEND_API_KEY)
    : null;
const EMAIL_FROM = process.env.EMAIL_FROM || 'AETHER Symposium <noreply@aether-iiitl.in>';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Check if email service is available
function isEmailEnabled(): boolean {
    if (!resend) {
        logger.warn('Email service disabled: RESEND_API_KEY not configured');
        return false;
    }
    return true;
}

// Helper to get leader from registration
async function getRegistrationWithLeader(registrationId: string) {
    const registration = await prisma.registration.findUnique({
        where: { id: registrationId },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    fee: true,
                    venue: true,
                    eventSchedule: true,
                    coordinators: true,
                },
            },
            participants: {
                orderBy: { isLeader: 'desc' },
            },
        },
    });

    if (!registration) {
        throw new Error(`Registration not found: ${registrationId}`);
    }

    // Get leader participant
    const leader = registration.participants.find(p => p.isLeader);
    if (!leader) {
        throw new Error(`No leader found for registration: ${registrationId}`);
    }

    return { registration, leader };
}

// Log email to database with status tracking
async function logEmail(
    registrationId: string | null,
    toEmail: string,
    type: string,
    subject: string,
    status: 'SENT' | 'FAILED' = 'SENT',
    error?: string
) {
    try {
        await prisma.emailLog.create({
            data: {
                registrationId,
                toEmail,
                type,
                subject,
                status,
                error,
            },
        });
    } catch (err) {
        logger.error('Failed to log email:', { err });
    }
}

/**
 * Send Payment Success Email
 */
export async function sendPaymentSuccessEmail(registrationId: string): Promise<boolean> {
    if (!isEmailEnabled()) return false;

    logger.info(`[EMAIL] Starting sendPaymentSuccessEmail for ${registrationId}`);

    try {
        const { registration, leader } = await getRegistrationWithLeader(registrationId);

        logger.info(`[EMAIL] Found leader: ${leader.email} for registration ${registrationId}`);

        // Parse coordinator info if available
        let coordinatorName: string | undefined;
        let coordinatorEmail: string | undefined;
        if (registration.event.coordinators) {
            const coordinators = registration.event.coordinators as any[];
            if (coordinators.length > 0) {
                coordinatorName = coordinators[0].name;
                coordinatorEmail = coordinators[0].email;
            }
        }

        // Parse event schedule
        let eventDate: string | undefined;
        let eventVenue: string | undefined = registration.event.venue || undefined;
        if (registration.event.eventSchedule) {
            const schedule = registration.event.eventSchedule as any;
            if (schedule.date) {
                eventDate = new Date(schedule.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            }
            if (schedule.venue) eventVenue = schedule.venue;
        }

        // Render email
        const emailHtml = await render(
            React.createElement(PaymentSuccessEmail, {
                leaderName: leader.fullName,
                eventTitle: registration.event.title,
                teamName: registration.teamName,
                participants: registration.participants.map(p => ({
                    fullName: p.fullName,
                    email: p.email,
                    phone: p.phone,
                    college: p.college,
                    isLeader: p.isLeader,
                })),
                paymentId: registration.razorpayPaymentId || undefined,
                amount: registration.amount,
                registrationId: registration.id,
                eventDate,
                eventVenue,
                coordinatorName,
                coordinatorEmail,
            })
        );

        const subject = `✓ Registration Confirmed: ${registration.event.title} | AETHER Symposium 2026`;

        // Send email
        const { error } = await resend!.emails.send({
            from: EMAIL_FROM,
            to: leader.email,
            subject,
            html: emailHtml,
        });

        if (error) {
            logger.error('Failed to send success email:', { error, registrationId });
            return false;
        }

        // Log email
        await logEmail(registrationId, leader.email, 'success', subject);

        logger.info(`Payment success email sent to ${leader.email}`, { registrationId });
        return true;
    } catch (error) {
        logger.error('Error sending payment success email:', { error, registrationId });
        return false;
    }
}

/**
 * Send Payment Failed Email
 */
export async function sendPaymentFailedEmail(registrationId: string): Promise<boolean> {
    if (!isEmailEnabled()) return false;

    try {
        const { registration, leader } = await getRegistrationWithLeader(registrationId);

        const retryUrl = `${FRONTEND_URL}/register/${registration.event.slug}`;

        // Render email
        const emailHtml = await render(
            React.createElement(PaymentFailedEmail, {
                leaderName: leader.fullName,
                eventTitle: registration.event.title,
                teamName: registration.teamName,
                amount: registration.amount,
                registrationId: registration.id,
                retryUrl,
            })
        );

        const subject = `Payment Failed: ${registration.event.title} | AETHER Symposium 2026`;

        // Send email
        const { error } = await resend!.emails.send({
            from: EMAIL_FROM,
            to: leader.email,
            subject,
            html: emailHtml,
        });

        if (error) {
            logger.error('Failed to send failed email:', { error, registrationId });
            return false;
        }

        // Log email
        await logEmail(registrationId, leader.email, 'failed', subject);

        logger.info(`Payment failed email sent to ${leader.email}`, { registrationId });
        return true;
    } catch (error) {
        logger.error('Error sending payment failed email:', { error, registrationId });
        return false;
    }
}

/**
 * Send Pending Reminder Email
 */
export async function sendPendingReminderEmail(registrationId: string): Promise<boolean> {
    if (!isEmailEnabled()) return false;

    try {
        const { registration, leader } = await getRegistrationWithLeader(registrationId);

        const registrationUrl = `${FRONTEND_URL}/register/${registration.event.slug}`;

        // Render email
        const emailHtml = await render(
            React.createElement(PendingReminderEmail, {
                leaderName: leader.fullName,
                eventTitle: registration.event.title,
                teamName: registration.teamName,
                amount: registration.amount,
                registrationId: registration.id,
                registrationUrl,
            })
        );

        const subject = `⏳ Complete Your Registration: ${registration.event.title} | AETHER Symposium 2026`;

        // Send email
        const { error } = await resend!.emails.send({
            from: EMAIL_FROM,
            to: leader.email,
            subject,
            html: emailHtml,
        });

        if (error) {
            logger.error('Failed to send reminder email:', { error, registrationId });
            return false;
        }

        // Log email
        await logEmail(registrationId, leader.email, 'reminder', subject);

        // Update reminderSent flag
        await prisma.registration.update({
            where: { id: registrationId },
            data: { reminderSent: true },
        });

        logger.info(`Pending reminder email sent to ${leader.email}`, { registrationId });
        return true;
    } catch (error) {
        logger.error('Error sending pending reminder email:', { error, registrationId });
        return false;
    }
}
