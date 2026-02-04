// Rename Blitz Coding to A&M Coding Challenge
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function renameEvent() {
    console.log('🔄 Renaming Blitz Coding to A&M Coding Challenge...');

    const result = await prisma.event.updateMany({
        where: { slug: 'blitz-coding' },
        data: {
            title: 'A&M Coding Challenge',
            slug: 'am-coding-challenge',
            description: 'Algorithm & Mastery Coding Challenge - A fast-paced coding competition where participants solve algorithmic challenges under intense time pressure.'
        }
    });

    console.log(`✅ Updated ${result.count} event(s)`);
    await prisma.$disconnect();
}

renameEvent().catch(console.error);
