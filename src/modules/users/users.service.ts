// Users Module - User profile operations

import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middlewares/error.middleware.js';

export async function getUserById(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return user;
}

export async function updateUserProfile(id: string, data: { name?: string }) {
    return prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
        },
    });
}
