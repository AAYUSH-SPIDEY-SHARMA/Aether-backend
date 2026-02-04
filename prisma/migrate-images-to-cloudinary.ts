// Script to migrate local images to Cloudinary
// Run: npx tsx prisma/migrate-images-to-cloudinary.ts
// 
// This script:
// 1. Uploads local images from public/images to Cloudinary
// 2. Updates database records with the new Cloudinary URLs

import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PUBLIC_DIR = path.join(process.cwd(), '..', 'public', 'images');

// Map of local paths to Cloudinary folders
const IMAGE_MAPPINGS = [
    // Team images
    { localPath: 'team/Anamitra.png', folder: 'aether/team', name: 'anamitra' },
    { localPath: 'team/Jatin.jpg', folder: 'aether/team', name: 'jatin' },
    { localPath: 'team/dr.-shubhra-jain.png', folder: 'aether/team', name: 'dr-shubhra-jain' },
    { localPath: 'team/sirsendu sir.jpg', folder: 'aether/team', name: 'sirsendu-barman' },
    // Wings images  
    { localPath: 'wings/Aayush-WnC.jpg', folder: 'aether/team', name: 'aayush-sharma' },
    { localPath: 'wings/wnc-logo.png', folder: 'aether/wings', name: 'wnc-logo' },
    { localPath: 'wings/climate-logo.png', folder: 'aether/wings', name: 'climate-logo' },
    { localPath: 'wings/LOGO.png', folder: 'aether/general', name: 'aether-logo' },
    // Main logo
    { localPath: 'LOGO.png', folder: 'aether/general', name: 'aether-main-logo' },
];

// Store uploaded URLs for updating database
const uploadedUrls: Record<string, string> = {};

async function uploadImage(mapping: typeof IMAGE_MAPPINGS[0]): Promise<string | null> {
    const fullPath = path.join(PUBLIC_DIR, mapping.localPath);

    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${mapping.localPath}`);
        return null;
    }

    try {
        const result = await cloudinary.uploader.upload(fullPath, {
            folder: mapping.folder,
            public_id: mapping.name,
            overwrite: true,
            resource_type: 'image',
        });

        console.log(`✅ Uploaded: ${mapping.localPath} → ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error(`❌ Failed to upload ${mapping.localPath}:`, error);
        return null;
    }
}

async function updateWingLogos() {
    console.log('\n📝 Updating Wing logos in database...\n');

    // Update WnC wing logo
    if (uploadedUrls['wings/wnc-logo.png']) {
        await prisma.wing.updateMany({
            where: { slug: 'wnc' },
            data: { logoUrl: uploadedUrls['wings/wnc-logo.png'] }
        });
        console.log('  ✅ Updated WnC wing logo');
    }

    // Update Climate wing logo
    if (uploadedUrls['wings/climate-logo.png']) {
        await prisma.wing.updateMany({
            where: { slug: 'climate' },
            data: { logoUrl: uploadedUrls['wings/climate-logo.png'] }
        });
        console.log('  ✅ Updated Climate wing logo');
    }
}

async function updateTeamMemberPhotos() {
    console.log('\n📝 Updating Team member photos in database...\n');

    const updates = [
        { name: 'Anamitra Majumder', localKey: 'team/Anamitra.png' },
        { name: 'Jatin', localKey: 'team/Jatin.jpg' },
        { name: 'Dr. Subhra Jain', localKey: 'team/dr.-shubhra-jain.png' },
        { name: 'Dr. Sirsendu Barman', localKey: 'team/sirsendu sir.jpg' },
        { name: 'Aayush Sharma', localKey: 'wings/Aayush-WnC.jpg' },
    ];

    for (const update of updates) {
        if (uploadedUrls[update.localKey]) {
            const result = await prisma.clubMember.updateMany({
                where: { name: { contains: update.name.split(' ')[0] } },
                data: { imageUrl: uploadedUrls[update.localKey] }
            });
            if (result.count > 0) {
                console.log(`  ✅ Updated ${update.name} (${result.count} records)`);
            }
        }
    }
}

async function main() {
    console.log('🚀 Migrating local images to Cloudinary...\n');
    console.log(`📁 Looking in: ${PUBLIC_DIR}\n`);

    // Check Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
        console.error('❌ Cloudinary credentials not configured in .env');
        console.error('   Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
        return;
    }

    console.log(`☁️  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}\n`);

    // Upload all images
    console.log('📤 Uploading images...\n');
    for (const mapping of IMAGE_MAPPINGS) {
        const url = await uploadImage(mapping);
        if (url) {
            uploadedUrls[mapping.localPath] = url;
        }
    }

    console.log(`\n📊 Uploaded ${Object.keys(uploadedUrls).length} / ${IMAGE_MAPPINGS.length} images`);

    // Update database records
    await updateWingLogos();
    await updateTeamMemberPhotos();

    console.log('\n🎉 Migration complete!');
    console.log('\nUploaded URLs:');
    Object.entries(uploadedUrls).forEach(([local, cloud]) => {
        console.log(`  ${local} → ${cloud}`);
    });
}

main()
    .catch((e) => {
        console.error('❌ Migration failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
