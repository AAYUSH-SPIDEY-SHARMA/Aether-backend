// Speaker Routes
import { Router } from 'express';
import * as speakerController from './speaker.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';

const router = Router();

// Public routes
router.get('/', speakerController.getAllSpeakers);
router.get('/featured', speakerController.getFeaturedSpeakers);
router.get('/symposium/:symposiumId', speakerController.getSpeakersBySymposium);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, speakerController.createSpeaker);
router.put('/:id', authMiddleware, adminMiddleware, speakerController.updateSpeaker);
router.delete('/:id', authMiddleware, adminMiddleware, speakerController.deleteSpeaker);

export { router as speakerRoutes };
