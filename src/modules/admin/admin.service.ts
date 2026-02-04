// Admin Service - Updated for ClubMember and new Registration model

import { prisma } from '../../config/prisma.js';
import { ClubMemberType, EventCategory, TeamType, SponsorTier } from '@prisma/client';

// ============================================
// WINGS CRUD
// ============================================

export async function createWing(data: {
    slug: string;
    name: string;
    tagline?: string;
    description: string;
    mission?: string;
    logoUrl?: string;
    color?: string;
    focus?: string[];
}) {
    const { focus, ...wingData } = data;

    return prisma.wing.create({
        data: {
            ...wingData,
            focus: focus ? {
                create: focus.map((title) => ({ title })),
            } : undefined,
        },
        include: { focus: true },
    });
}

export async function updateWing(id: string, data: Partial<{
    name: string;
    tagline: string;
    description: string;
    mission: string;
    logoUrl: string;
    logoCrop: string;
    color: string;
    isActive: boolean;
    sortOrder: number;
}>) {
    return prisma.wing.update({
        where: { id },
        data,
    });
}

export async function deleteWing(id: string) {
    return prisma.wing.delete({ where: { id } });
}

// ============================================
// CLUB MEMBER CRUD (renamed from TeamMember)
// ============================================

export async function createClubMember(data: {
    name: string;
    program: string;
    imageUrl?: string;
    imageCrop?: string;
    primaryRole: string;
    secondaryRole?: string;
    highlightTag?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    type: ClubMemberType;
    wingId?: string;
    symposiumId?: string;
    sortOrder?: number;
}) {
    return prisma.clubMember.create({ data });
}

export async function updateClubMember(id: string, data: Partial<{
    name: string;
    program: string;
    imageUrl: string;
    imageCrop: string;
    primaryRole: string;
    secondaryRole: string;
    highlightTag: string;
    linkedin: string;
    github: string;
    isActive: boolean;
    sortOrder: number;
}>) {
    return prisma.clubMember.update({
        where: { id },
        data,
    });
}

export async function deleteClubMember(id: string) {
    return prisma.clubMember.delete({ where: { id } });
}

// ============================================
// SYMPOSIUM CRUD
// ============================================

export async function createSymposium(data: {
    year: number;
    title: string;
    theme?: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    venueDetails?: string;
}) {
    return prisma.symposium.create({ data });
}

export async function updateSymposium(id: string, data: Partial<{
    title: string;
    theme: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    venueDetails: string;
    isActive: boolean;
    isUpcoming: boolean;
}>) {
    return prisma.symposium.update({
        where: { id },
        data,
    });
}

export async function setActiveSymposium(id: string) {
    await prisma.symposium.updateMany({
        data: { isActive: false },
    });

    return prisma.symposium.update({
        where: { id },
        data: { isActive: true },
    });
}

// ============================================
// EVENT CRUD (with teamType)
// ============================================

export async function createEvent(data: {
    symposiumId: string;
    title: string;
    slug: string;
    eventType: EventCategory;
    teamType: TeamType;
    description: string;
    longDescription?: string;
    rules?: string;
    fee?: number;
    maxSeats?: number;
    imageUrl?: string;
    imageCrop?: string;
    venue?: string;
    duration?: string;
    difficulty?: string;
    prizes?: string;
    minTeamSize?: number;
    maxTeamSize?: number;
}) {
    return prisma.event.create({ data });
}

export async function updateEvent(id: string, data: Partial<{
    title: string;
    description: string;
    longDescription: string;
    rules: string;
    fee: number;
    maxSeats: number;
    imageUrl: string;
    imageCrop: string;
    isLive: boolean;
    minTeamSize: number;
    maxTeamSize: number;
    sortOrder: number;
}>) {
    return prisma.event.update({
        where: { id },
        data,
    });
}

export async function deleteEvent(id: string) {
    return prisma.event.delete({ where: { id } });
}

// ============================================
// REGISTRATIONS VIEW (with participants)
// ============================================

export async function getAllRegistrations(symposiumId?: string) {
    return prisma.registration.findMany({
        where: symposiumId ? {
            event: { symposiumId },
        } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
            event: {
                select: { id: true, title: true, slug: true, eventType: true, teamType: true },
            },
            participants: {
                orderBy: { isLeader: 'desc' },
            },
        },
    });
}

export async function getRegistrationStats(symposiumId: string) {
    const [total, successful, pending, failed] = await Promise.all([
        prisma.registration.count({ where: { event: { symposiumId } } }),
        prisma.registration.count({ where: { event: { symposiumId }, status: 'SUCCESS' } }),
        prisma.registration.count({ where: { event: { symposiumId }, status: 'PENDING' } }),
        prisma.registration.count({ where: { event: { symposiumId }, status: 'FAILED' } }),
    ]);

    const revenue = await prisma.registration.aggregate({
        where: { event: { symposiumId }, status: 'SUCCESS' },
        _sum: { amount: true },
    });

    // Get participant count
    const participantCount = await prisma.participant.count({
        where: {
            registration: {
                event: { symposiumId },
                status: 'SUCCESS',
            },
        },
    });

    return {
        total,
        successful,
        pending,
        failed,
        revenue: revenue._sum.amount || 0,
        participantCount,
    };
}

// ============================================
// SPONSOR CRUD
// ============================================

export async function createSponsor(data: {
    symposiumId: string;
    name: string;
    logoUrl?: string;
    website?: string;
    tier: SponsorTier;
}) {
    return prisma.sponsor.create({ data });
}

export async function updateSponsor(id: string, data: Partial<{
    name: string;
    logoUrl: string;
    website: string;
    tier: SponsorTier;
}>) {
    return prisma.sponsor.update({ where: { id }, data });
}

export async function deleteSponsor(id: string) {
    return prisma.sponsor.delete({ where: { id } });
}

// ============================================
// WING GALLERY CRUD
// ============================================

export async function createGalleryImage(data: {
    wingId: string;
    imageUrl: string;
    imageCrop?: string;
    title: string;
    year?: string;
    sortOrder?: number;
}) {
    return prisma.wingGalleryImage.create({ data });
}

export async function updateGalleryImage(id: string, data: Partial<{
    imageUrl: string;
    imageCrop: string;
    title: string;
    year: string;
    sortOrder: number;
    isActive: boolean;
}>) {
    return prisma.wingGalleryImage.update({
        where: { id },
        data,
    });
}

export async function deleteGalleryImage(id: string) {
    return prisma.wingGalleryImage.delete({ where: { id } });
}

export async function getWingGallery(wingId: string) {
    return prisma.wingGalleryImage.findMany({
        where: { wingId, isActive: true },
        orderBy: { sortOrder: 'asc' },
    });
}

