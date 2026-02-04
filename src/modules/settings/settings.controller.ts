// Site Settings Controller
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma.js';
import { sendSuccess } from '../../utils/response.js';

// GET /api/settings
export async function getAllSettings(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const settings = await prisma.siteSetting.findMany();
        // Convert to key-value object
        const settingsMap: Record<string, string> = {};
        settings.forEach(s => { settingsMap[s.key] = s.value; });
        sendSuccess(res, { settings: settingsMap }, 'Settings retrieved');
    } catch (error) {
        next(error);
    }
}

// GET /api/settings/:key
export async function getSetting(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const setting = await prisma.siteSetting.findUnique({
            where: { key: req.params.key }
        });
        sendSuccess(res, { value: setting?.value || null }, 'Setting retrieved');
    } catch (error) {
        next(error);
    }
}

// PUT /api/settings/:key
export async function updateSetting(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { value, description } = req.body;
        const setting = await prisma.siteSetting.upsert({
            where: { key: req.params.key },
            update: { value, description },
            create: { key: req.params.key, value, description }
        });
        sendSuccess(res, { setting }, 'Setting updated');
    } catch (error) {
        next(error);
    }
}

// POST /api/settings/bulk
export async function bulkUpdateSettings(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { settings } = req.body; // { key: value } object
        const updates = Object.entries(settings).map(([key, value]) =>
            prisma.siteSetting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            })
        );
        await Promise.all(updates);
        sendSuccess(res, null, 'Settings updated');
    } catch (error) {
        next(error);
    }
}
