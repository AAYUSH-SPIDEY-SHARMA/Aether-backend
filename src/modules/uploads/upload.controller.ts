// Upload Controller - Handles image upload to Cloudinary

import { Request, Response } from 'express';
import fs from 'fs';
import { uploadImage } from '../../config/cloudinary.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { logger } from '../../utils/logger.js';

// Valid folders for organization
const VALID_FOLDERS = ['wings', 'events', 'team', 'sponsors', 'speakers', 'symposium', 'general', 'gallery', 'assets'];

export async function uploadImageController(req: Request, res: Response) {
    const file = req.file;
    const folder = req.params.folder || 'general';

    // Validate folder
    if (!VALID_FOLDERS.includes(folder)) {
        return sendError(res, `Invalid folder. Must be one of: ${VALID_FOLDERS.join(', ')}`, 400);
    }

    // Check if file exists
    if (!file) {
        return sendError(res, 'No file uploaded', 400);
    }

    try {
        // Upload to Cloudinary with folder organization
        const cloudinaryFolder = `aether/${folder}`;
        const imageUrl = await uploadImage(file.path, cloudinaryFolder);

        logger.info(`Image uploaded to Cloudinary: ${imageUrl}`, { folder });

        // CLEANUP: Delete temp file after successful upload
        fs.unlinkSync(file.path);
        logger.info('Temp file deleted:', { path: file.path });

        return sendSuccess(res, { imageUrl }, 'Image uploaded successfully');
    } catch (error: any) {
        logger.error('Image upload failed:', { error: error.message });

        // CLEANUP: Delete temp file even on error
        if (file && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        return sendError(res, 'Failed to upload image', 500);
    }
}

