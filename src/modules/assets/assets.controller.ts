// Site Assets Controller
import { Request, Response } from 'express';
import * as assetsService from './assets.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { AppError } from '../../middlewares/error.middleware.js';

// GET /api/assets - Get all assets
export async function getAllAssets(_req: Request, res: Response) {
    const assets = await assetsService.getAllAssets();
    sendSuccess(res, { assets });
}

// GET /api/assets/:key - Get asset by key
export async function getAssetByKey(req: Request, res: Response) {
    const { key } = req.params;
    const asset = await assetsService.getAssetByKey(key);
    if (!asset) {
        throw new AppError('Asset not found', 404);
    }
    sendSuccess(res, { asset });
}

// GET /api/assets/category/:category - Get by category
export async function getAssetsByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const assets = await assetsService.getAssetsByCategory(category);
    sendSuccess(res, { assets });
}

// POST /api/assets - Create new asset
export async function createAsset(req: Request, res: Response) {
    const { key, name, category, imageUrl, publicId, transformations, width, height, format, description } = req.body;

    if (!key || !name || !category || !imageUrl) {
        throw new AppError('Key, name, category, and imageUrl are required', 400);
    }

    const asset = await assetsService.createAsset({
        key,
        name,
        category,
        imageUrl,
        publicId,
        transformations,
        width,
        height,
        format,
        description,
    });
    sendCreated(res, { asset });
}

// PUT /api/assets/:id - Update asset
export async function updateAsset(req: Request, res: Response) {
    const { id } = req.params;
    const { name, category, imageUrl, publicId, transformations, width, height, format, description, isActive } = req.body;

    const asset = await assetsService.updateAsset(id, {
        name,
        category,
        imageUrl,
        publicId,
        transformations,
        width,
        height,
        format,
        description,
        isActive,
    });
    sendSuccess(res, { asset });
}

// DELETE /api/assets/:id - Delete asset
export async function deleteAsset(req: Request, res: Response) {
    const { id } = req.params;
    await assetsService.deleteAsset(id);
    res.status(204).send();
}

// GET /api/assets/public/:key - Public endpoint to get asset URL with transformations
export async function getPublicAsset(req: Request, res: Response) {
    const { key } = req.params;
    const { w, h, c, g } = req.query; // width, height, crop, gravity

    const asset = await assetsService.getAssetByKey(key);
    if (!asset || !asset.isActive) {
        throw new AppError('Asset not found', 404);
    }

    // Build custom transformations if query params provided
    let transformations = asset.transformations;
    if (w || h || c || g) {
        transformations = JSON.stringify({
            width: w ? parseInt(w as string) : undefined,
            height: h ? parseInt(h as string) : undefined,
            crop: c || 'fill',
            gravity: g || 'center',
        });
    }

    const url = assetsService.getTransformedUrl(asset.imageUrl, transformations ?? undefined);
    sendSuccess(res, { url, asset: { ...asset, transformedUrl: url } });
}
