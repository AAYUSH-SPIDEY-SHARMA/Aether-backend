// Registration Service - Event-Centric Model
// ONE REGISTRATION = ONE EVENT = ONE TEAM (or SOLO)
// Public registration (no auth required)

import { prisma } from '../../config/prisma.js';
import { PaymentStatus } from '@prisma/client';
import { AppError } from '../../middlewares/error.middleware.js';
import type { CreateRegistrationInput } from './registration.validation.js';
import { sendPaymentSuccessEmail } from '../../utils/email.js';

// Create registration (PUBLIC - no auth required)
export async function createRegistration(input: CreateRegistrationInput) {
    const { eventId, teamName, participants } = input;

    // 1. Fetch event and validate it exists
    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
            symposium: { select: { id: true, title: true, year: true } },
        },
    });

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    if (!event.isLive) {
        throw new AppError('Registration for this event is not open', 400);
    }

    // 2. Validate team size against event rules
    const teamSize = participants.length;

    if (teamSize < event.minTeamSize) {
        throw new AppError(
            `Minimum team size is ${event.minTeamSize}. You provided ${teamSize}.`,
            400
        );
    }

    if (teamSize > event.maxTeamSize) {
        throw new AppError(
            `Maximum team size is ${event.maxTeamSize}. You provided ${teamSize}.`,
            400
        );
    }

    // 3. Validate exactly one leader
    const leaderCount = participants.filter(p => p.isLeader).length;
    if (leaderCount !== 1) {
        throw new AppError('Exactly one participant must be marked as leader', 400);
    }

    // 4. Check for duplicate registrations (same leader email for same event)
    const leaderEmail = participants.find(p => p.isLeader)!.email.toLowerCase();

    // Check for existing SUCCESS registration - strictly block
    const successfulRegistration = await prisma.registration.findFirst({
        where: {
            eventId,
            participants: {
                some: {
                    email: { equals: leaderEmail, mode: 'insensitive' },
                    isLeader: true,
                },
            },
            status: PaymentStatus.SUCCESS,
        },
    });

    if (successfulRegistration) {
        throw new AppError('You have already registered for this event', 409);
    }

    // Check for existing PENDING registration - allow resume
    const pendingRegistration = await prisma.registration.findFirst({
        where: {
            eventId,
            participants: {
                some: {
                    email: { equals: leaderEmail, mode: 'insensitive' },
                    isLeader: true,
                },
            },
            status: PaymentStatus.PENDING,
        },
        include: {
            event: {
                select: { id: true, title: true, slug: true, fee: true, teamType: true },
            },
            participants: true,
        },
    });

    if (pendingRegistration) {
        // Return existing pending registration for payment resume
        // This allows user to complete payment without re-entering info
        return {
            ...pendingRegistration,
            isResume: true, // Flag to indicate this is a resumed registration
        };
    }

    // 5. Check seat availability
    if (event.maxSeats) {
        const successfulRegistrations = await prisma.registration.count({
            where: { eventId, status: PaymentStatus.SUCCESS },
        });

        if (successfulRegistrations >= event.maxSeats) {
            throw new AppError('Event is fully booked', 400);
        }
    }

    // 6. Create registration with participants
    // For free events (fee=0), mark as SUCCESS immediately
    const isFreeEvent = event.fee === 0;

    const registration = await prisma.registration.create({
        data: {
            eventId,
            teamName,
            status: isFreeEvent ? PaymentStatus.SUCCESS : PaymentStatus.PENDING,
            amount: event.fee,
            createdByEmail: leaderEmail,
            paidAt: isFreeEvent ? new Date() : undefined,
            participants: {
                create: participants.map(p => ({
                    fullName: p.fullName,
                    email: p.email.toLowerCase(),
                    phone: p.phone,
                    college: p.college,
                    isLeader: p.isLeader,
                })),
            },
        },
        include: {
            event: {
                select: { id: true, title: true, slug: true, fee: true, teamType: true },
            },
            participants: true,
        },
    });

    // For free events, send confirmation email immediately
    if (isFreeEvent) {
        sendPaymentSuccessEmail(registration.id).catch(err => {
            console.error('Failed to send free event confirmation email:', err);
        });
    }

    return registration;
}

// Get registration by ID
export async function getRegistrationById(id: string) {
    const registration = await prisma.registration.findUnique({
        where: { id },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    eventType: true,
                    teamType: true,
                    fee: true,
                    symposium: { select: { year: true, title: true } },
                },
            },
            participants: {
                orderBy: { isLeader: 'desc' },
            },
        },
    });

    if (!registration) {
        throw new AppError('Registration not found', 404);
    }

    return registration;
}

// Get registration status (for polling after payment)
export async function getRegistrationStatus(id: string) {
    const registration = await prisma.registration.findUnique({
        where: { id },
        select: {
            id: true,
            status: true,
            amount: true,
            teamName: true,
            razorpayOrderId: true,
            paidAt: true,
            event: {
                select: { id: true, title: true },
            },
        },
    });

    if (!registration) {
        throw new AppError('Registration not found', 404);
    }

    return registration;
}

// Get registrations by email (for user to check their registrations)
export async function getRegistrationsByEmail(email: string) {
    return prisma.registration.findMany({
        where: {
            participants: {
                some: {
                    email: { equals: email, mode: 'insensitive' },
                    isLeader: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    eventType: true,
                    symposium: { select: { year: true, title: true } },
                },
            },
            participants: {
                where: { isLeader: true },
                select: { fullName: true, email: true },
            },
        },
    });
}

// Update registration status (called by payment webhook)
export async function updateRegistrationByOrderId(
    razorpayOrderId: string,
    status: PaymentStatus,
    razorpayPaymentId?: string,
    razorpaySignature?: string
) {
    const registration = await prisma.registration.findUnique({
        where: { razorpayOrderId },
    });

    if (!registration) {
        throw new AppError('Registration not found for this order', 404);
    }

    return prisma.registration.update({
        where: { razorpayOrderId },
        data: {
            status,
            razorpayPaymentId,
            razorpaySignature,
            paidAt: status === PaymentStatus.SUCCESS ? new Date() : null,
        },
    });
}

// Link Razorpay order to registration
export async function linkRazorpayOrder(
    registrationId: string,
    razorpayOrderId: string
) {
    return prisma.registration.update({
        where: { id: registrationId },
        data: { razorpayOrderId },
    });
}
