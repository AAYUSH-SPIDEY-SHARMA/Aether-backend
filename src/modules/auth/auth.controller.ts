// Auth Controller
// HTTP request handlers for authentication

import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service.js';
import { registerSchema, loginSchema, refreshSchema } from './auth.validation.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

// POST /auth/register
export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const input = registerSchema.parse(req.body);
        const result = await authService.registerUser(input);

        sendCreated(res, result, 'Registration successful');
    } catch (error) {
        next(error);
    }
}

// POST /auth/login
export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const input = loginSchema.parse(req.body);
        const result = await authService.loginUser(input);

        sendSuccess(res, result, 'Login successful');
    } catch (error) {
        next(error);
    }
}

// POST /auth/refresh
export async function refresh(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { refreshToken } = refreshSchema.parse(req.body);
        const tokens = await authService.refreshTokens(refreshToken);

        sendSuccess(res, { tokens }, 'Tokens refreshed');
    } catch (error) {
        next(error);
    }
}

// POST /auth/logout
export async function logout(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (req.user) {
            await authService.logoutUser(req.user.id);
        }

        sendSuccess(res, null, 'Logout successful');
    } catch (error) {
        next(error);
    }
}

// GET /auth/me
export async function me(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const user = await authService.getCurrentUser(req.user!.id);

        sendSuccess(res, { user }, 'User retrieved');
    } catch (error) {
        next(error);
    }
}
