// Site Assets Routes
import { Router } from 'express';
import * as assetsController from './assets.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';

const router = Router();

// Public route - get asset URL with optional transformations
router.get('/public/:key', assetsController.getPublicAsset);

// Admin routes - protected
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/', assetsController.getAllAssets);
router.get('/category/:category', assetsController.getAssetsByCategory);
router.get('/:key', assetsController.getAssetByKey);
router.post('/', assetsController.createAsset);
router.put('/:id', assetsController.updateAsset);
router.delete('/:id', assetsController.deleteAsset);

export default router;
