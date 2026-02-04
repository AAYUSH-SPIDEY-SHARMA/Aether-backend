// Wings Service
// Business logic for wings

import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middlewares/error.middleware.js';

// Get all active wings
export async function getAllWings() {
    return prisma.wing.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
            focus: {
                select: { id: true, title: true },
            },
            activities: {
                select: { id: true, title: true, description: true },
            },
            members: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
                select: {
                    id: true,
                    name: true,
                    program: true,
                    imageUrl: true,
                    imageCrop: true,
                    primaryRole: true,
                    secondaryRole: true,
                    linkedin: true,
                    github: true,
                    type: true,
                },
            },
            gallery: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
                select: {
                    id: true,
                    imageUrl: true,
                    imageCrop: true,
                    title: true,
                    year: true,
                },
            },
        },
    });
}

// Get wing by slug
export async function getWingBySlug(slug: string) {
    const wing = await prisma.wing.findUnique({
        where: { slug },
        include: {
            focus: {
                select: { id: true, title: true },
            },
            activities: {
                select: { id: true, title: true, description: true },
            },
            members: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
                select: {
                    id: true,
                    name: true,
                    program: true,
                    imageUrl: true,
                    imageCrop: true,
                    primaryRole: true,
                    secondaryRole: true,
                    linkedin: true,
                    github: true,
                },
            },
        },
    });

    if (!wing) {
        throw new AppError('Wing not found', 404);
    }

    return wing;
}

// Get wing by ID
export async function getWingById(id: string) {
    const wing = await prisma.wing.findUnique({
        where: { id },
        include: {
            focus: true,
            activities: true,
            members: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
            },
        },
    });

    if (!wing) {
        throw new AppError('Wing not found', 404);
    }

    return wing;
}
