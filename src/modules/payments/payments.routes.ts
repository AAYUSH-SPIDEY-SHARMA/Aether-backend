// Payments Routes - Updated for public access

import { Router } from 'express';
import * as paymentsController from './payments.controller.js';
import { razorpayWebhookMiddleware } from '../../middlewares/razorpay.middleware.js';

const router = Router();

// PUBLIC - Create Razorpay order (no auth required)
router.post('/create-order', paymentsController.createOrder);

// PUBLIC - Verify payment status (for polling)
router.get('/verify/:orderId', paymentsController.verifyPayment);

// PUBLIC - Confirm payment manually (when webhook is slow)
router.post('/confirm', paymentsController.confirmPayment);

// Webhook - protected by signature verification
router.post('/webhook', razorpayWebhookMiddleware, paymentsController.webhook);

export default router;

