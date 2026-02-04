// Seed Script - Add AETHER Symposium 2026 Organizing Committee
// Run: npx ts-node prisma/seed-symposium-team.ts
/// <reference types="node" />

import { PrismaClient, ClubMemberType } from '@prisma/client';

const prisma = new PrismaClient();

// AETHER Symposium 2026 Organizing Committee
const symposiumTeam2026 = [
    {
        name: "Anamitra Majumder",
        program: "M.Sc. DS 2024",
        primaryRole: "Student Chair",
        secondaryRole: "Design",
        highlightTag: "⭐ Student Chair",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
        linkedin: "https://www.linkedin.com/in/anamitra-majumder-b59b81330/",
    },
    {
        name: "Kashish Nagar",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Organizing Secretary",
        secondaryRole: "Design",
        highlightTag: "⭐ Organizing Secretary",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
        linkedin: null,
    },
    {
        name: "Aayush Sharma",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Competitions Co-Chair",
        secondaryRole: null,
        highlightTag: "⭐ Competitions Co-Chair",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
        linkedin: "https://www.linkedin.com/in/aayush-sharma-661179330/",
        github: "https://github.com/",
    },
    {
        name: "Jatin",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Competitions Co-Chair",
        secondaryRole: null,
        highlightTag: "⭐ Competitions Co-Chair",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
        linkedin: "https://www.linkedin.com/in/jatingyass/",
        github: "https://github.com/",
    },
    {
        name: "Praveen Agrawal",
        program: "M.Sc. DS 2024",
        primaryRole: "Treasurer",
        secondaryRole: null,
        highlightTag: "⭐ Treasurer",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
        linkedin: null,
    },
    {
        name: "Gaurav Kumar",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Project Showcase Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Kollamuri Rajesh",
        program: "M.Sc. DS 2024",
        primaryRole: "Speaker & Guest Relations Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Avisweta De",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Speaker 1 POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Dimple Bhardwaj",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Speaker 2 POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Rupsa Roy",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Design / Registration",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Aishrica",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Registration",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Manas Singh",
        program: "M.Sc. DS 2025",
        primaryRole: "Publicity & Outreach Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Moumita Paul",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Publicity & Outreach",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Rohit Kumar Meena",
        program: "M.Sc. DS 2025",
        primaryRole: "Publicity & Outreach",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Sunil Kumar",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Nitesh Kumar",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
        linkedin: null,
    },
    {
        name: "Uday Kumar",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: "Registration",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
        linkedin: null,
    },
    {
        name: "Lokesh Prajapat",
        program: "M.Sc. DS 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
        linkedin: null,
    },
    {
        name: "Debayan Bandyopadhyay",
        program: "M.Sc. DS 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: "Design Head",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Ajay",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
        linkedin: null,
    },
    {
        name: "Urmila Saini",
        program: "M.Sc. DS 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
        linkedin: null,
    },
    {
        name: "Sridip Basu",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Technical & Workshop Head",
        secondaryRole: "Linux POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
        github: "https://github.com/",
    },
    {
        name: "Harsh Jain",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Technical & Workshop",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
        github: "https://github.com/",
    },
    {
        name: "Tarun Kumar Rai",
        program: "M.Sc. DS 2025",
        primaryRole: "Sponsorships & Partnerships Head",
        secondaryRole: "Speaker 3 POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
    {
        name: "Roshini",
        program: "M.Sc. DS 2025",
        primaryRole: "Sponsorships & Partnerships",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        linkedin: null,
    },
];

async function main() {
    console.log('🎯 Seeding AETHER Symposium 2026 Team...');

    // Get the active symposium
    const symposium = await prisma.symposium.findFirst({
        where: { year: 2026 },
    });

    if (!symposium) {
        console.error('❌ Symposium 2026 not found. Run main seed first.');
        return;
    }

    let added = 0;
    let skipped = 0;

    for (const member of symposiumTeam2026) {
        // Check if already exists by name + program
        const existing = await prisma.clubMember.findFirst({
            where: {
                name: member.name,
                program: member.program,
            },
        });

        if (existing) {
            console.log(`⏭️  Skipping (exists): ${member.name}`);
            skipped++;
            continue;
        }

        await prisma.clubMember.create({
            data: {
                name: member.name,
                program: member.program,
                primaryRole: member.primaryRole,
                secondaryRole: member.secondaryRole,
                highlightTag: member.highlightTag,
                type: member.type,
                linkedin: member.linkedin,
                github: (member as any).github || null,
                isActive: true,
                symposiumId: symposium.id,
                sortOrder: added,
            },
        });

        console.log(`✅ Added: ${member.name} (${member.type})`);
        added++;
    }

    console.log(`\n🎉 Seed complete! Added: ${added}, Skipped: ${skipped}`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
