// Common Validation Schemas using Zod

import { z } from 'zod';

// ID validation
export const idSchema = z.string().uuid('Invalid ID format');

// Email validation
export const emailSchema = z.string().email('Invalid email format').toLowerCase();

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number');

// Pagination
export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
});

// Common string validations
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100);
export const slugSchema = z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only');
export const urlSchema = z.string().url('Invalid URL format').optional().or(z.literal(''));

// Date validation
export const dateSchema = z.coerce.date();

// Positive integer
export const positiveInt = z.coerce.number().int().positive();

// Non-negative integer (includes 0)
export const nonNegativeInt = z.coerce.number().int().nonnegative();

// Validate and parse helper
export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
}

// Safe parse helper (returns errors instead of throwing)
export function safeValidate<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError['errors'] } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error.errors };
}
