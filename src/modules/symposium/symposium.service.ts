// Symposium Service

import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middlewares/error.middleware.js';

// Get active symposium
export async function getActiveSymposium() {
    const symposium = await prisma.symposium.findFirst({
        where: { isActive: true },
        include: {
            events: {
                where: { isLive: true },
                orderBy: { sortOrder: 'asc' },
            },
            team: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
            },
            sponsors: {
                orderBy: { tier: 'asc' },
            },
            schedule: {
                orderBy: { dayNumber: 'asc' },
                include: {
                    slots: {
                        orderBy: { startTime: 'asc' },
                    },
                },
            },
        },
    });

    if (!symposium) {
        throw new AppError('No active symposium found', 404);
    }

    return symposium;
}

// Get symposium by year
export async function getSymposiumByYear(year: number) {
    const symposium = await prisma.symposium.findUnique({
        where: { year },
        include: {
            events: {
                orderBy: { sortOrder: 'asc' },
            },
            team: {
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' },
            },
            sponsors: {
                orderBy: { tier: 'asc' },
            },
            schedule: {
                orderBy: { dayNumber: 'asc' },
                include: {
                    slots: {
                        orderBy: { startTime: 'asc' },
                    },
                },
            },
        },
    });

    if (!symposium) {
        throw new AppError(`Symposium ${year} not found`, 404);
    }

    return symposium;
}

// Get all symposiums (for archive)
export async function getAllSymposiums() {
    return prisma.symposium.findMany({
        orderBy: { year: 'desc' },
        select: {
            id: true,
            year: true,
            title: true,
            theme: true,
            isActive: true,
            startDate: true,
            endDate: true,
        },
    });
}

// Get symposium by ID
export async function getSymposiumById(id: string) {
    const symposium = await prisma.symposium.findUnique({
        where: { id },
        include: {
            events: true,
            team: true,
            sponsors: true,
            schedule: {
                include: {
                    slots: true,
                },
            },
        },
    });

    if (!symposium) {
        throw new AppError('Symposium not found', 404);
    }

    return symposium;
}
