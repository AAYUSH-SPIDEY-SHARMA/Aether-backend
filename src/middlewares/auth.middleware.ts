// Authentication Middleware
// Verifies JWT token and attaches user to request

import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { verifyAccessToken, extractBearerToken, TokenPayload } from '../utils/jwt.js';
import { sendUnauthorized } from '../utils/response.js';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        // Extract token from header
        const token = extractBearerToken(req.headers.authorization);

        if (!token) {
            sendUnauthorized(res, 'No token provided');
            return;
        }

        // Verify token
        let payload: TokenPayload;
        try {
            payload = verifyAccessToken(token);
        } catch {
            sendUnauthorized(res, 'Invalid or expired token');
            return;
        }

        // Verify user exists in database
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, role: true },
        });

        if (!user) {
            sendUnauthorized(res, 'User not found');
            return;
        }

        // Attach user to request
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (error) {
        sendUnauthorized(res, 'Authentication failed');
    }
}

// Optional auth - doesn't fail if no token, just doesn't set user
export async function optionalAuthMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const token = extractBearerToken(req.headers.authorization);

        if (!token) {
            next();
            return;
        }

        const payload = verifyAccessToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, role: true },
        });

        if (user) {
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
        }

        next();
    } catch {
        // Ignore errors for optional auth
        next();
    }
}
