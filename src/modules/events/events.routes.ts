// Events Routes

import { Router } from 'express';
import * as eventsController from './events.controller.js';

const router = Router();

// Get all events from active symposium (for frontend Events page)
router.get('/', eventsController.getActiveEvents);

// Get events by symposium ID
router.get('/symposium/:symposiumId', eventsController.getEventsBySymposium);

// Get single event by slug (from active symposium)
router.get('/:slugOrId', eventsController.getEventBySlugOrId);

export default router;
