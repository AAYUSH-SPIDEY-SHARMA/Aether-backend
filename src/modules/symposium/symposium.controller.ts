// Symposium Controller

import { Request, Response, NextFunction } from 'express';
import * as symposiumService from './symposium.service.js';
import { sendSuccess } from '../../utils/response.js';

// GET /symposium/active
export async function getActiveSymposium(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const symposium = await symposiumService.getActiveSymposium();
        sendSuccess(res, { symposium }, 'Active symposium retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /symposium/year/:year
export async function getSymposiumByYear(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const year = parseInt(req.params.year, 10);
        const symposium = await symposiumService.getSymposiumByYear(year);
        sendSuccess(res, { symposium }, 'Symposium retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /symposium
export async function getAllSymposiums(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const symposiums = await symposiumService.getAllSymposiums();
        sendSuccess(res, { symposiums }, 'Symposiums retrieved');
    } catch (error) {
        next(error);
    }
}
