// FAQ Controller
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

// GET /api/faqs
export async function getAllFAQs(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const faqs = await prisma.fAQ.findMany({
            where: { isActive: true },
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
        });
        sendSuccess(res, { faqs }, 'FAQs retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /api/faqs/symposium/:symposiumId
export async function getFAQsBySymposium(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const faqs = await prisma.fAQ.findMany({
            where: {
                symposiumId: req.params.symposiumId,
                isActive: true
            },
            orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
        });
        sendSuccess(res, { faqs }, 'FAQs retrieved');
    } catch (error) {
        next(error);
    }
}

// POST /api/faqs
export async function createFAQ(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const faq = await prisma.fAQ.create({ data: req.body });
        sendCreated(res, { faq }, 'FAQ created');
    } catch (error) {
        next(error);
    }
}

// PUT /api/faqs/:id
export async function updateFAQ(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const faq = await prisma.fAQ.update({
            where: { id: req.params.id },
            data: req.body
        });
        sendSuccess(res, { faq }, 'FAQ updated');
    } catch (error) {
        next(error);
    }
}

// DELETE /api/faqs/:id
export async function deleteFAQ(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        await prisma.fAQ.delete({ where: { id: req.params.id } });
        sendSuccess(res, null, 'FAQ deleted');
    } catch (error) {
        next(error);
    }
}
