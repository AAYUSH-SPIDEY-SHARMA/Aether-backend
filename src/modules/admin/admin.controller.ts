// Admin Controller - Updated for ClubMember

import { Request, Response, NextFunction } from 'express';
import * as adminService from './admin.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

// ===== WINGS =====

export async function createWing(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const wing = await adminService.createWing(req.body);
        sendCreated(res, { wing }, 'Wing created');
    } catch (error) {
        next(error);
    }
}

export async function updateWing(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const wing = await adminService.updateWing(req.params.id, req.body);
        sendSuccess(res, { wing }, 'Wing updated');
    } catch (error) {
        next(error);
    }
}

export async function deleteWing(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await adminService.deleteWing(req.params.id);
        sendSuccess(res, null, 'Wing deleted');
    } catch (error) {
        next(error);
    }
}

// ===== CLUB MEMBERS =====

export async function createClubMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const member = await adminService.createClubMember(req.body);
        sendCreated(res, { member }, 'Club member created');
    } catch (error) {
        next(error);
    }
}

export async function updateClubMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const member = await adminService.updateClubMember(req.params.id, req.body);
        sendSuccess(res, { member }, 'Club member updated');
    } catch (error) {
        next(error);
    }
}

export async function deleteClubMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await adminService.deleteClubMember(req.params.id);
        sendSuccess(res, null, 'Club member deleted');
    } catch (error) {
        next(error);
    }
}

// ===== SYMPOSIUM =====

export async function createSymposium(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const symposium = await adminService.createSymposium(req.body);
        sendCreated(res, { symposium }, 'Symposium created');
    } catch (error) {
        next(error);
    }
}

export async function updateSymposium(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const symposium = await adminService.updateSymposium(req.params.id, req.body);
        sendSuccess(res, { symposium }, 'Symposium updated');
    } catch (error) {
        next(error);
    }
}

export async function setActiveSymposium(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const symposium = await adminService.setActiveSymposium(req.params.id);
        sendSuccess(res, { symposium }, 'Symposium activated');
    } catch (error) {
        next(error);
    }
}

// ===== EVENTS =====

export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const event = await adminService.createEvent(req.body);
        sendCreated(res, { event }, 'Event created');
    } catch (error) {
        next(error);
    }
}

export async function updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const event = await adminService.updateEvent(req.params.id, req.body);
        sendSuccess(res, { event }, 'Event updated');
    } catch (error) {
        next(error);
    }
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await adminService.deleteEvent(req.params.id);
        sendSuccess(res, null, 'Event deleted');
    } catch (error) {
        next(error);
    }
}

// ===== REGISTRATIONS =====

export async function getAllRegistrations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { symposiumId } = req.query;
        const registrations = await adminService.getAllRegistrations(symposiumId as string);
        sendSuccess(res, { registrations }, 'Registrations retrieved');
    } catch (error) {
        next(error);
    }
}

export async function getRegistrationStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const stats = await adminService.getRegistrationStats(req.params.symposiumId);
        sendSuccess(res, { stats }, 'Stats retrieved');
    } catch (error) {
        next(error);
    }
}

// ===== SPONSORS =====

export async function createSponsor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const sponsor = await adminService.createSponsor(req.body);
        sendCreated(res, { sponsor }, 'Sponsor created');
    } catch (error) {
        next(error);
    }
}

export async function updateSponsor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const sponsor = await adminService.updateSponsor(req.params.id, req.body);
        sendSuccess(res, { sponsor }, 'Sponsor updated');
    } catch (error) {
        next(error);
    }
}

export async function deleteSponsor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await adminService.deleteSponsor(req.params.id);
        sendSuccess(res, null, 'Sponsor deleted');
    } catch (error) {
        next(error);
    }
}

// ===== WING GALLERY =====

export async function createGalleryImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const image = await adminService.createGalleryImage(req.body);
        sendCreated(res, { image }, 'Gallery image created');
    } catch (error) {
        next(error);
    }
}

export async function updateGalleryImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const image = await adminService.updateGalleryImage(req.params.id, req.body);
        sendSuccess(res, { image }, 'Gallery image updated');
    } catch (error) {
        next(error);
    }
}

export async function deleteGalleryImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await adminService.deleteGalleryImage(req.params.id);
        sendSuccess(res, null, 'Gallery image deleted');
    } catch (error) {
        next(error);
    }
}

export async function getWingGallery(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const gallery = await adminService.getWingGallery(req.params.wingId);
        sendSuccess(res, { gallery }, 'Gallery retrieved');
    } catch (error) {
        next(error);
    }
}

