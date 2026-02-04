// Wings Routes

import { Router } from 'express';
import * as wingsController from './wings.controller.js';

const router = Router();

// Public routes
router.get('/', wingsController.getAllWings);
router.get('/:slug', wingsController.getWingBySlug);

export default router;
