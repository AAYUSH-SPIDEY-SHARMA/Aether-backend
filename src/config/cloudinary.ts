// Cloudinary Configuration

import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Upload helper - PRESERVES ORIGINAL QUALITY
export async function uploadImage(
    filePath: string,
    folder: string = 'aether'
): Promise<string> {
    const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'auto',
        // NO TRANSFORMATIONS - preserve original quality!
        // Original image is stored as-is without any compression or resize
        quality: 100,        // 100% quality - no compression
        // DO NOT add width/height limits - keep original dimensions
    });
    return result.secure_url;
}

// Delete helper
export async function deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
}
