// Site Assets Service - Manage all website images with Cloudinary transformations
import { prisma } from '../../config/prisma.js';
import { AppError } from '../../middlewares/error.middleware.js';

// Get all site assets
export async function getAllAssets() {
    return prisma.siteAsset.findMany({
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
}

// Get asset by key
export async function getAssetByKey(key: string) {
    const asset = await prisma.siteAsset.findUnique({
        where: { key },
    });
    return asset;
}

// Get assets by category
export async function getAssetsByCategory(category: string) {
    return prisma.siteAsset.findMany({
        where: { category, isActive: true },
        orderBy: { name: 'asc' },
    });
}

// Create new asset
export async function createAsset(data: {
    key: string;
    name: string;
    category: string;
    imageUrl: string;
    publicId?: string;
    transformations?: string;
    width?: number;
    height?: number;
    format?: string;
    description?: string;
}) {
    return prisma.siteAsset.create({ data });
}

// Update asset
export async function updateAsset(id: string, data: {
    name?: string;
    category?: string;
    imageUrl?: string;
    publicId?: string;
    transformations?: string;
    width?: number;
    height?: number;
    format?: string;
    description?: string;
    isActive?: boolean;
}) {
    const asset = await prisma.siteAsset.findUnique({ where: { id } });
    if (!asset) {
        throw new AppError('Asset not found', 404);
    }
    return prisma.siteAsset.update({
        where: { id },
        data,
    });
}

// Delete asset
export async function deleteAsset(id: string) {
    const asset = await prisma.siteAsset.findUnique({ where: { id } });
    if (!asset) {
        throw new AppError('Asset not found', 404);
    }
    return prisma.siteAsset.delete({ where: { id } });
}

// Upsert asset (create or update by key)
export async function upsertAsset(key: string, data: {
    name: string;
    category: string;
    imageUrl: string;
    publicId?: string;
    transformations?: string;
    width?: number;
    height?: number;
    format?: string;
    description?: string;
}) {
    return prisma.siteAsset.upsert({
        where: { key },
        update: data,
        create: { key, ...data },
    });
}

// Get Cloudinary URL with transformations
export function getTransformedUrl(baseUrl: string, transformations?: string): string {
    if (!transformations || !baseUrl.includes('cloudinary')) {
        return baseUrl;
    }

    try {
        const transforms = JSON.parse(transformations);
        const { width, height, crop, gravity, zoom, x, y, quality } = transforms;

        // Build transformation string
        const parts: string[] = [];
        if (width) parts.push(`w_${width}`);
        if (height) parts.push(`h_${height}`);
        if (crop) parts.push(`c_${crop}`); // fill, crop, scale, fit, thumb
        if (gravity) parts.push(`g_${gravity}`); // center, face, auto, north, etc.
        if (zoom) parts.push(`z_${zoom}`);
        if (x) parts.push(`x_${x}`);
        if (y) parts.push(`y_${y}`);
        if (quality) parts.push(`q_${quality}`);

        if (parts.length === 0) return baseUrl;

        // Insert transformations into Cloudinary URL
        // Format: https://res.cloudinary.com/cloud/image/upload/TRANSFORMS/folder/image.jpg
        const transformString = parts.join(',');
        return baseUrl.replace('/upload/', `/upload/${transformString}/`);
    } catch {
        return baseUrl;
    }
}
