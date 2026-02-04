// Events Service - Updated for frontend integration

import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middlewares/error.middleware.js';

// Get all events from active symposium
export async function getActiveEvents() {
    const symposium = await prisma.symposium.findFirst({
        where: { isActive: true },
    });

    if (!symposium) {
        return [];
    }

    return prisma.event.findMany({
        where: { symposiumId: symposium.id, isLive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
            symposium: {
                select: { id: true, year: true, title: true },
            },
            _count: {
                select: { registrations: { where: { status: 'SUCCESS' } } },
            },
        },
    });
}

// Get events by symposium
export async function getEventsBySymposium(symposiumId: string) {
    return prisma.event.findMany({
        where: { symposiumId, isLive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
            symposium: {
                select: { id: true, year: true, title: true },
            },
            _count: {
                select: { registrations: { where: { status: 'SUCCESS' } } },
            },
        },
    });
}

// Get event by slug or ID (smart lookup)
export async function getEventBySlugOrId(slugOrId: string) {
    // First try by ID
    let event = await prisma.event.findUnique({
        where: { id: slugOrId },
        include: {
            symposium: {
                select: { id: true, year: true, title: true },
            },
            _count: {
                select: { registrations: { where: { status: 'SUCCESS' } } },
            },
        },
    });

    // If not found by ID, try by slug in active symposium
    if (!event) {
        const symposium = await prisma.symposium.findFirst({
            where: { isActive: true },
        });

        if (symposium) {
            event = await prisma.event.findUnique({
                where: { symposiumId_slug: { symposiumId: symposium.id, slug: slugOrId } },
                include: {
                    symposium: {
                        select: { id: true, year: true, title: true },
                    },
                    _count: {
                        select: { registrations: { where: { status: 'SUCCESS' } } },
                    },
                },
            });
        }
    }

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    return {
        ...event,
        registeredCount: event._count.registrations,
        spotsRemaining: event.maxSeats
            ? event.maxSeats - event._count.registrations
            : null,
    };
}

// Get event by slug (specific symposium)
export async function getEventBySlug(symposiumId: string, slug: string) {
    const event = await prisma.event.findUnique({
        where: { symposiumId_slug: { symposiumId, slug } },
        include: {
            symposium: {
                select: { id: true, year: true, title: true },
            },
            _count: {
                select: { registrations: { where: { status: 'SUCCESS' } } },
            },
        },
    });

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    return {
        ...event,
        spotsRemaining: event.maxSeats
            ? event.maxSeats - event._count.registrations
            : null,
    };
}

// Get event by ID
export async function getEventById(id: string) {
    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            symposium: true,
            _count: {
                select: { registrations: { where: { status: 'SUCCESS' } } },
            },
        },
    });

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    return event;
}

// Check if event has available spots
export async function hasAvailableSpots(eventId: string): Promise<boolean> {
    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
            _count: {
                select: { registrations: { where: { status: 'SUCCESS' } } },
            },
        },
    });

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    if (!event.maxSeats) return true;
    return event._count.registrations < event.maxSeats;
}
