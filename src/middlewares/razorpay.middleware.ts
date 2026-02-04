// Razorpay Webhook Middleware
// Verifies webhook signature to prevent spoofing

import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { RAZORPAY_WEBHOOK_SECRET } from '../config/razorpay.js';
import { sendUnauthorized } from '../utils/response.js';
import { logger } from '../utils/logger.js';

// Extend Request to include raw body for signature verification
declare global {
    namespace Express {
        interface Request {
            rawBody?: Buffer;
        }
    }
}

export function razorpayWebhookMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    try {
        const signature = req.headers['x-razorpay-signature'] as string;

        if (!signature) {
            logger.warn('Razorpay webhook: Missing signature');
            sendUnauthorized(res, 'Missing webhook signature');
            return;
        }

        // Get raw body for signature verification
        const body = req.rawBody || Buffer.from(JSON.stringify(req.body));

        // Generate expected signature
        const expectedSignature = crypto
            .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
            .update(body)
            .digest('hex');

        // Compare signatures
        const isValid = crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );

        if (!isValid) {
            logger.warn('Razorpay webhook: Invalid signature');
            sendUnauthorized(res, 'Invalid webhook signature');
            return;
        }

        logger.info('Razorpay webhook: Signature verified');
        next();
    } catch (error) {
        logger.error('Razorpay webhook verification failed:', { error });
        sendUnauthorized(res, 'Webhook verification failed');
    }
}

// Middleware to capture raw body for signature verification
export function captureRawBody(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    if (req.headers['x-razorpay-signature']) {
        let data = Buffer.alloc(0);

        req.on('data', (chunk: Buffer) => {
            data = Buffer.concat([data, chunk]);
        });

        req.on('end', () => {
            req.rawBody = data;
            next();
        });
    } else {
        next();
    }
}
