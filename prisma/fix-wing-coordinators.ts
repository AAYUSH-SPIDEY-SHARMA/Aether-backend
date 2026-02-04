// Script to assign wing coordinators to their wings and fix gallery
// Run: npx tsx prisma/fix-wing-coordinators.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Fixing wing coordinators and gallery...\n');

    // Get wings
    const wncWing = await prisma.wing.findUnique({ where: { slug: 'wnc' } });
    const climateWing = await prisma.wing.findUnique({ where: { slug: 'climate' } });

    if (!wncWing || !climateWing) {
        console.error('❌ Wings not found. Run main seed first.');
        return;
    }

    console.log(`✅ Found wings: ${wncWing.name}, ${climateWing.name}\n`);

    // Assign WnC coordinators
    console.log('📝 Assigning WnC Wing coordinators...');
    const wncResult = await prisma.clubMember.updateMany({
        where: {
            OR: [
                { name: { contains: 'Aayush' }, type: 'WING_COORDINATOR' },
                { name: { contains: 'Jatin' }, type: 'WING_COORDINATOR' },
            ]
        },
        data: { wingId: wncWing.id }
    });
    console.log(`  ✅ Updated ${wncResult.count} WnC coordinators`);

    // Assign Climate coordinators
    console.log('📝 Assigning Climate Wing coordinators...');
    const climateResult = await prisma.clubMember.updateMany({
        where: {
            name: { contains: 'Sahil' },
            type: 'WING_COORDINATOR'
        },
        data: { wingId: climateWing.id }
    });
    console.log(`  ✅ Updated ${climateResult.count} Climate coordinators`);

    // Verify assignments
    console.log('\n📊 Verification:');
    const wncMembers = await prisma.clubMember.findMany({
        where: { wingId: wncWing.id, type: 'WING_COORDINATOR' },
        select: { name: true, primaryRole: true }
    });
    console.log(`  WnC Wing: ${wncMembers.map(m => m.name).join(', ')}`);

    const climateMembers = await prisma.clubMember.findMany({
        where: { wingId: climateWing.id, type: 'WING_COORDINATOR' },
        select: { name: true, primaryRole: true }
    });
    console.log(`  Climate Wing: ${climateMembers.map(m => m.name).join(', ')}`);

    console.log('\n🎉 Done!');
}

main()
    .catch((e) => {
        console.error('❌ Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
