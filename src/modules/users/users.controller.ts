import { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service.js';
import { sendSuccess } from '../../utils/response.js';

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = await usersService.getUserById(req.user!.id);
        sendSuccess(res, { user }, 'Profile retrieved');
    } catch (error) {
        next(error);
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = await usersService.updateUserProfile(req.user!.id, req.body);
        sendSuccess(res, { user }, 'Profile updated');
    } catch (error) {
        next(error);
    }
}
