// API Response Helpers
// Standardized response format across all endpoints

import { Response } from 'express';

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

// Success response
export function sendSuccess<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
): Response {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    } as ApiResponse<T>);
}

// Created response (201)
export function sendCreated<T>(
    res: Response,
    data: T,
    message: string = 'Created successfully'
): Response {
    return sendSuccess(res, data, message, 201);
}

// Paginated response
export function sendPaginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success'
): Response {
    return res.status(200).json({
        success: true,
        message,
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    } as ApiResponse<T[]>);
}

// Error response
export function sendError(
    res: Response,
    message: string,
    statusCode: number = 400,
    error?: string
): Response {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error || message,
    } as ApiResponse);
}

// Not found response
export function sendNotFound(
    res: Response,
    message: string = 'Resource not found'
): Response {
    return sendError(res, message, 404);
}

// Unauthorized response
export function sendUnauthorized(
    res: Response,
    message: string = 'Unauthorized'
): Response {
    return sendError(res, message, 401);
}

// Forbidden response
export function sendForbidden(
    res: Response,
    message: string = 'Forbidden'
): Response {
    return sendError(res, message, 403);
}

// Validation error response
export function sendValidationError(
    res: Response,
    errors: Record<string, string[]>
): Response {
    return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
    });
}
