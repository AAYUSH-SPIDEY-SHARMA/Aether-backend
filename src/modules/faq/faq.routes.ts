// FAQ Routes
import { Router } from 'express';
import * as faqController from './faq.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';

const router = Router();

// Public routes
router.get('/', faqController.getAllFAQs);
router.get('/symposium/:symposiumId', faqController.getFAQsBySymposium);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, faqController.createFAQ);
router.put('/:id', authMiddleware, adminMiddleware, faqController.updateFAQ);
router.delete('/:id', authMiddleware, adminMiddleware, faqController.deleteFAQ);

export { router as faqRoutes };
