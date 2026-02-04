// Main Routes File
// Wires all module routes together

import { Router } from 'express';

// Import all module routes
import { authRoutes } from './modules/auth/index.js';
import { wingsRoutes } from './modules/wings/index.js';
import { teamRoutes } from './modules/team/index.js';
import { symposiumRoutes } from './modules/symposium/index.js';
import { eventsRoutes } from './modules/events/index.js';
import { registrationRoutes } from './modules/registration/index.js';
import { paymentsRoutes } from './modules/payments/index.js';
import { adminRoutes } from './modules/admin/index.js';
import { usersRoutes } from './modules/users/index.js';
import { faqRoutes } from './modules/faq/index.js';
import { speakerRoutes } from './modules/speaker/index.js';
import { settingsRoutes } from './modules/settings/index.js';
import uploadRoutes from './modules/uploads/upload.routes.js';
import assetsRoutes from './modules/assets/assets.routes.js';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'aether-backend',
    });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/wings', wingsRoutes);
router.use('/team', teamRoutes);
router.use('/symposium', symposiumRoutes);
router.use('/events', eventsRoutes);
router.use('/registration', registrationRoutes);
router.use('/payments', paymentsRoutes);
router.use('/admin', adminRoutes);
router.use('/users', usersRoutes);
router.use('/faqs', faqRoutes);
router.use('/speakers', speakerRoutes);
router.use('/settings', settingsRoutes);
router.use('/uploads', uploadRoutes);
router.use('/assets', assetsRoutes);

export default router;



