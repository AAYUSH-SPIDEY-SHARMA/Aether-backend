// Site Settings Routes
import { Router } from 'express';
import * as settingsController from './settings.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';

const router = Router();

// Public routes
router.get('/', settingsController.getAllSettings);
router.get('/:key', settingsController.getSetting);

// Admin routes
router.put('/:key', authMiddleware, adminMiddleware, settingsController.updateSetting);
router.post('/bulk', authMiddleware, adminMiddleware, settingsController.bulkUpdateSettings);

export { router as settingsRoutes };
