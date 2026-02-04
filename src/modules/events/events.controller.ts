// Events Controller - Updated for frontend integration

import { Request, Response, NextFunction } from 'express';
import * as eventsService from './events.service.js';
import { sendSuccess } from '../../utils/response.js';

// GET /events - Get all events from active symposium
export async function getActiveEvents(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const events = await eventsService.getActiveEvents();
        sendSuccess(res, { events }, 'Events retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /events/symposium/:symposiumId
export async function getEventsBySymposium(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const events = await eventsService.getEventsBySymposium(req.params.symposiumId);
        sendSuccess(res, { events }, 'Events retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /events/:slugOrId - Smart lookup by slug or ID
export async function getEventBySlugOrId(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const event = await eventsService.getEventBySlugOrId(req.params.slugOrId);
        sendSuccess(res, { event }, 'Event retrieved');
    } catch (error) {
        next(error);
    }
}

// Legacy: GET /events/:symposiumId/:slug
export async function getEventBySlug(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const event = await eventsService.getEventBySlug(
            req.params.symposiumId,
            req.params.slug
        );
        sendSuccess(res, { event }, 'Event retrieved');
    } catch (error) {
        next(error);
    }
}
