// Wings Controller

import { Request, Response, NextFunction } from 'express';
import * as wingsService from './wings.service.js';
import { sendSuccess } from '../../utils/response.js';

// GET /wings
export async function getAllWings(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const wings = await wingsService.getAllWings();
        sendSuccess(res, { wings }, 'Wings retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /wings/:slug
export async function getWingBySlug(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const wing = await wingsService.getWingBySlug(req.params.slug);
        sendSuccess(res, { wing }, 'Wing retrieved');
    } catch (error) {
        next(error);
    }
}
