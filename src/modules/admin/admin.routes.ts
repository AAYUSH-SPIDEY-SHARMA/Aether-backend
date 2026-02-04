// Admin Routes - Updated for ClubMember naming

import { Router } from 'express';
import * as adminController from './admin.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';

const router = Router();

// Apply auth + admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Wings
router.post('/wing', adminController.createWing);
router.put('/wing/:id', adminController.updateWing);
router.delete('/wing/:id', adminController.deleteWing);

// Club Members (renamed from team)
router.post('/member', adminController.createClubMember);
router.put('/member/:id', adminController.updateClubMember);
router.delete('/member/:id', adminController.deleteClubMember);

// Symposium
router.post('/symposium', adminController.createSymposium);
router.put('/symposium/:id', adminController.updateSymposium);
router.post('/symposium/:id/activate', adminController.setActiveSymposium);

// Events
router.post('/event', adminController.createEvent);
router.put('/event/:id', adminController.updateEvent);
router.delete('/event/:id', adminController.deleteEvent);

// Registrations (read-only)
router.get('/registrations', adminController.getAllRegistrations);
router.get('/registrations/stats/:symposiumId', adminController.getRegistrationStats);

// Sponsors
router.post('/sponsor', adminController.createSponsor);
router.put('/sponsor/:id', adminController.updateSponsor);
router.delete('/sponsor/:id', adminController.deleteSponsor);

// Wing Gallery
router.get('/wing/:wingId/gallery', adminController.getWingGallery);
router.post('/gallery', adminController.createGalleryImage);
router.put('/gallery/:id', adminController.updateGalleryImage);
router.delete('/gallery/:id', adminController.deleteGalleryImage);

export default router;
