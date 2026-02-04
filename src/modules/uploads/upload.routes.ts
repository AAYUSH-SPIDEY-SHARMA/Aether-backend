// Upload Routes - Admin-only image upload endpoints

import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { uploadImageController } from './upload.controller.js';

const router = Router();

// POST /uploads/image/:folder - Upload image to specific folder
// Folders: wings, events, team, sponsors, speakers, symposium, general
router.post(
    '/image/:folder',
    authMiddleware,
    adminMiddleware,
    upload.single('image'),
    uploadImageController
);

// POST /uploads/image - Upload image to general folder (fallback)
router.post(
    '/image',
    authMiddleware,
    adminMiddleware,
    upload.single('image'),
    uploadImageController
);

export default router;
