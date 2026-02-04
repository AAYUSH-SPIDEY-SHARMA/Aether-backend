import { Router } from 'express';
import * as usersController from './users.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/profile', usersController.getProfile);
router.put('/profile', usersController.updateProfile);

export default router;
