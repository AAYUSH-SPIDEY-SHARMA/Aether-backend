// Admin Middleware
// Requires authenticated user with ADMIN role

import { Request, Response, NextFunction } from 'express';
import { sendForbidden, sendUnauthorized } from '../utils/response.js';

export function adminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Check if user is attached (authMiddleware should run first)
    if (!req.user) {
        sendUnauthorized(res, 'Authentication required');
        return;
    }

    // Check if user is admin
    if (req.user.role !== 'ADMIN') {
        sendForbidden(res, 'Admin access required');
        return;
    }

    next();
}

// Coordinator or Admin middleware
export function coordinatorMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (!req.user) {
        sendUnauthorized(res, 'Authentication required');
        return;
    }

    if (req.user.role !== 'ADMIN' && req.user.role !== 'COORDINATOR') {
        sendForbidden(res, 'Coordinator or admin access required');
        return;
    }

    next();
}
