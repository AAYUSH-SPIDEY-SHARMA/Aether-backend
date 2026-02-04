// Speaker Controller
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

// GET /api/speakers
export async function getAllSpeakers(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const speakers = await prisma.speaker.findMany({
            where: { isActive: true },
            orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }]
        });
        sendSuccess(res, { speakers }, 'Speakers retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /api/speakers/featured
export async function getFeaturedSpeakers(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const speakers = await prisma.speaker.findMany({
            where: { isActive: true, isFeatured: true },
            orderBy: { sortOrder: 'asc' }
        });
        sendSuccess(res, { speakers }, 'Featured speakers retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /api/speakers/symposium/:symposiumId
export async function getSpeakersBySymposium(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const speakers = await prisma.speaker.findMany({
            where: {
                symposiumId: req.params.symposiumId,
                isActive: true
            },
            orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }]
        });
        sendSuccess(res, { speakers }, 'Speakers retrieved');
    } catch (error) {
        next(error);
    }
}

// POST /api/speakers
export async function createSpeaker(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const speaker = await prisma.speaker.create({ data: req.body });
        sendCreated(res, { speaker }, 'Speaker created');
    } catch (error) {
        next(error);
    }
}

// PUT /api/speakers/:id
export async function updateSpeaker(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const speaker = await prisma.speaker.update({
            where: { id: req.params.id },
            data: req.body
        });
        sendSuccess(res, { speaker }, 'Speaker updated');
    } catch (error) {
        next(error);
    }
}

// DELETE /api/speakers/:id
export async function deleteSpeaker(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await prisma.speaker.delete({ where: { id: req.params.id } });
        sendSuccess(res, null, 'Speaker deleted');
    } catch (error) {
        next(error);
    }
}
