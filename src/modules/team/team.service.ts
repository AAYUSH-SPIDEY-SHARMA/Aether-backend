// Team Service - Uses ClubMember model

import { prisma } from '../../config/prisma.js';
import { ClubMemberType } from '@prisma/client';

// Get all team members (club + symposium)
export async function getAllMembers(type?: ClubMemberType) {
    return prisma.clubMember.findMany({
        where: {
            isActive: true,
            ...(type && { type }),
        },
        orderBy: [
            { type: 'asc' },
            { sortOrder: 'asc' },
        ],
        include: {
            wing: {
                select: { id: true, name: true, slug: true },
            },
            symposium: {
                select: { id: true, year: true, title: true },
            },
        },
    });
}

// Get club team (faculty + coordinators)
export async function getClubTeam() {
    const faculty = await prisma.clubMember.findMany({
        where: { isActive: true, type: ClubMemberType.FACULTY },
        orderBy: { sortOrder: 'asc' },
    });

    const coordinators = await prisma.clubMember.findMany({
        where: { isActive: true, type: ClubMemberType.CLUB_COORDINATOR },
        orderBy: { sortOrder: 'asc' },
        include: {
            wing: {
                select: { id: true, name: true, slug: true },
            },
        },
    });

    return { faculty, coordinators };
}

// Get symposium team
export async function getSymposiumTeam(symposiumId: string) {
    return prisma.clubMember.findMany({
        where: {
            isActive: true,
            symposiumId,
            type: {
                in: [
                    ClubMemberType.SYMPOSIUM_COORDINATOR,
                    ClubMemberType.SYMPOSIUM_CORE,
                    ClubMemberType.SYMPOSIUM_VOLUNTEER,
                ],
            },
        },
        orderBy: { sortOrder: 'asc' },
    });
}
