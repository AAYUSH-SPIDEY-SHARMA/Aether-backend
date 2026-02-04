// Pending Reminder Background Job
// Sends reminder emails for registrations pending > 30 minutes

import { prisma } from '../config/prisma.js';
import { PaymentStatus } from '@prisma/client';
import { sendPendingReminderEmail } from '../utils/email.js';
import { logger } from '../utils/logger.js';

// 30 minutes in milliseconds
const PENDING_THRESHOLD_MS = 30 * 60 * 1000;

// 5 minutes interval
const JOB_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Find and process pending registrations older than 30 minutes
 */
async function processPendingReminders(): Promise<void> {
    const thirtyMinutesAgo = new Date(Date.now() - PENDING_THRESHOLD_MS);

    try {
        // Find pending registrations older than 30 minutes with reminder not sent
        // Only for paid events that have a Razorpay order (not free events)
        const pendingRegistrations = await prisma.registration.findMany({
            where: {
                status: PaymentStatus.PENDING,
                reminderSent: false,
                createdAt: {
                    lte: thirtyMinutesAgo,
                },
                // Only for paid events (amount > 0)
                amount: {
                    gt: 0,
                },
                // Must have Razorpay order (ensures it's not a free event or system error)
                razorpayOrderId: {
                    not: null,
                },
            },
            select: {
                id: true,
                teamName: true,
                createdAt: true,
            },
        });

        if (pendingRegistrations.length === 0) {
            return;
        }

        logger.info(`Found ${pendingRegistrations.length} pending registrations for reminder`);

        // Process each registration
        for (const registration of pendingRegistrations) {
            try {
                const success = await sendPendingReminderEmail(registration.id);
                if (success) {
                    logger.info(`Reminder sent for registration ${registration.id}`);
                } else {
                    // Email failed (e.g., Resend API error, free tier restriction)
                    // reminderSent flag is NOT updated, so it will be retried next cycle
                    logger.warn(`Reminder email failed for ${registration.id} - will retry next cycle`);
                }
            } catch (error) {
                logger.error(`Failed to send reminder for ${registration.id}:`, { error });
            }
        }
    } catch (error) {
        logger.error('Error in pending reminder job:', { error });
    }
}

/**
 * Start the background job
 */
export function startPendingReminderJob(): void {
    logger.info('Starting pending reminder background job (interval: 5 minutes)');

    // Run immediately on startup (optional)
    setTimeout(() => {
        processPendingReminders().catch(console.error);
    }, 10000); // Wait 10 seconds after server start

    // Then run every 5 minutes
    setInterval(() => {
        processPendingReminders().catch(console.error);
    }, JOB_INTERVAL_MS);
}

export default startPendingReminderJob;
