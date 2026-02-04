// Registration Controller - Event-Centric Model
// Public registration (no auth required for create)

import { Request, Response, NextFunction } from 'express';
import * as registrationService from './registration.service.js';
import { createRegistrationSchema } from './registration.validation.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

// POST /registration/create (PUBLIC - no auth required)
export async function createRegistration(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const input = createRegistrationSchema.parse(req.body);
        const registration = await registrationService.createRegistration(input);
        sendCreated(res, { registration }, 'Registration created');
    } catch (error) {
        next(error);
    }
}

// GET /registration/status/:id
export async function getRegistrationStatus(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const status = await registrationService.getRegistrationStatus(req.params.id);
        sendSuccess(res, status, 'Registration status retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /registration/:id
export async function getRegistrationById(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const registration = await registrationService.getRegistrationById(req.params.id);
        sendSuccess(res, { registration }, 'Registration retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /registration/email/:email (check registrations by email)
export async function getRegistrationsByEmail(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const registrations = await registrationService.getRegistrationsByEmail(req.params.email);
        sendSuccess(res, { registrations }, 'Registrations retrieved');
    } catch (error) {
        next(error);
    }
}
