// Registration Routes - Event-Centric Model
// Create is PUBLIC, other routes for status checking

import { Router } from 'express';
import * as registrationController from './registration.controller.js';

const router = Router();

// PUBLIC - Create registration (no auth required)
router.post('/create', registrationController.createRegistration);

// PUBLIC - Check registration status (for payment polling)
router.get('/status/:id', registrationController.getRegistrationStatus);

// PUBLIC - Get full registration details
router.get('/:id', registrationController.getRegistrationById);

// PUBLIC - Get registrations by email (for user lookup)
router.get('/email/:email', registrationController.getRegistrationsByEmail);

export default router;
