// Seed Script - AETHER Full Team (Club + Symposium 2026)
// Run: npx tsx prisma/seed-full-team.ts
// This script seeds ALL team members with correct roles from mock data

import { PrismaClient, ClubMemberType } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CLUB TEAM (Faculty Advisors + Coordinators)
// ==========================================
const clubTeam = [
    // Faculty Advisors
    {
        name: "Dr. Sirsendu Barman",
        program: "Computer Science & Engineering",
        primaryRole: "Faculty Advisor",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.FACULTY,
        imageUrl: "/images/team/sirsendu sir.jpg",
        linkedin: "https://www.linkedin.com/in/sirsendu-sekhar-barman-14a9ab80/",
        email: "sirsendu@iiitl.ac.in",
    },
    {
        name: "Dr. Subhra Jain",
        program: "Information Technology",
        primaryRole: "Faculty Advisor",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.FACULTY,
        imageUrl: "/images/team/dr.-shubhra-jain.png",
        email: "shubhra@iiitl.ac.in",
    },
    // Club Coordinators
    {
        name: "Anamitra Majumder",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Overall Coordinator",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.CLUB_COORDINATOR,
        imageUrl: "/images/team/Anamitra.png",
        linkedin: "https://www.linkedin.com/in/anamitra-majumder-b59b81330/",
    },
    {
        name: "Kashish Nagar",
        program: "M.Sc. DS 2024",
        primaryRole: "Overall Coordinator",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.CLUB_COORDINATOR,
    },
    {
        name: "Aayush Sharma",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Web & Coding Wing Coordinator",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.WING_COORDINATOR,
        imageUrl: "/images/wings/Aayush-WnC.jpg",
        linkedin: "https://www.linkedin.com/in/aayush-sharma-661179330/",
    },
    {
        name: "Jatin",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Web & Coding Wing Coordinator",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.WING_COORDINATOR,
        imageUrl: "/images/team/Jatin.jpg",
        linkedin: "https://www.linkedin.com/in/jatingyass/",
    },
    {
        name: "Sahil Rafaliya",
        program: "M.Sc. DS (CDA) 2024",
        primaryRole: "Climate Tech Wing Coordinator",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.WING_COORDINATOR,
    },
];

// ==========================================
// SYMPOSIUM 2026 ORGANIZING COMMITTEE
// ==========================================
const symposiumTeam = [
    {
        name: "Anamitra Majumder",
        program: "M.Sc. DS 2024",
        primaryRole: "Student Chair",
        secondaryRole: "Design",
        highlightTag: "⭐ Student Chair",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
        imageUrl: "/images/team/Anamitra.png",
        linkedin: "https://www.linkedin.com/in/anamitra-majumder-b59b81330/",
    },
    {
        name: "Kashish Nagar",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Organizing Secretary",
        secondaryRole: "Design",
        highlightTag: "⭐ Organizing Secretary",
        type: ClubMemberType.SYMPOSIUM_COORDINATOR,
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
        imageUrl: "/images/team/Jatin.jpg",
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
    },
    {
        name: "Gaurav Kumar",
        program: "M.Sc. AI/ML 2024",
        primaryRole: "Project Showcase Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Kollamuri Rajesh",
        program: "M.Sc. DS 2024",
        primaryRole: "Speaker & Guest Relations Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Avisweta De",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Speaker 1 POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Dimple Bhardwaj",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Speaker 2 POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Rupsa Roy",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Design / Registration",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Aishrica",
        program: "M.Sc. DS 2025",
        primaryRole: "Speaker & Guest Relations",
        secondaryRole: "Registration",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Manas Singh",
        program: "M.Sc. DS 2025",
        primaryRole: "Publicity & Outreach Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Moumita Paul",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Publicity & Outreach",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Rohit Kumar Meena",
        program: "M.Sc. DS 2025",
        primaryRole: "Publicity & Outreach",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Sunil Kumar",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations Head",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Nitesh Kumar",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
    },
    {
        name: "Uday Kumar",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: "Registration",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
    },
    {
        name: "Lokesh Prajapat",
        program: "M.Sc. DS 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
    },
    {
        name: "Debayan Bandyopadhyay",
        program: "M.Sc. DS 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: "Design Head",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Ajay",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
    },
    {
        name: "Urmila Saini",
        program: "M.Sc. DS 2025",
        primaryRole: "Logistics & Operations",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_VOLUNTEER,
    },
    {
        name: "Sridip Basu",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Technical & Workshop Head",
        secondaryRole: "Linux POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        github: "https://github.com/",
    },
    {
        name: "Harsh Jain",
        program: "M.Sc. AI/ML 2025",
        primaryRole: "Technical & Workshop",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
        github: "https://github.com/",
    },
    {
        name: "Tarun Kumar Rai",
        program: "M.Sc. DS 2025",
        primaryRole: "Sponsorships & Partnerships Head",
        secondaryRole: "Speaker 3 POC",
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
    {
        name: "Roshini",
        program: "M.Sc. DS 2025",
        primaryRole: "Sponsorships & Partnerships",
        secondaryRole: null,
        highlightTag: null,
        type: ClubMemberType.SYMPOSIUM_CORE,
    },
];

async function main() {
    console.log('🎯 Seeding AETHER Full Team (Club + Symposium 2026)...');
    console.log('⚠️  This will DELETE all existing ClubMembers first.\n');

    // Get the symposium for linking
    const symposium = await prisma.symposium.findFirst({
        where: { year: 2026 },
    });

    // Delete all existing club members
    const deleted = await prisma.clubMember.deleteMany();
    console.log(`🗑️  Deleted ${deleted.count} existing members\n`);

    // Seed Club Team
    console.log('📋 Seeding Club Team...');
    let clubCount = 0;
    for (const member of clubTeam) {
        await prisma.clubMember.create({
            data: {
                name: member.name,
                program: member.program,
                primaryRole: member.primaryRole,
                secondaryRole: member.secondaryRole || null,
                highlightTag: member.highlightTag || null,
                type: member.type,
                imageUrl: (member as any).imageUrl || null,
                linkedin: (member as any).linkedin || null,
                github: (member as any).github || null,
                email: (member as any).email || null,
                isActive: true,
                sortOrder: clubCount,
            },
        });
        console.log(`  ✅ ${member.name} (${member.type})`);
        clubCount++;
    }
    console.log(`\n📊 Club Team: ${clubCount} members\n`);

    // Seed Symposium Team
    console.log('📋 Seeding Symposium 2026 Team...');
    let sympCount = 0;
    for (const member of symposiumTeam) {
        await prisma.clubMember.create({
            data: {
                name: member.name,
                program: member.program,
                primaryRole: member.primaryRole,
                secondaryRole: member.secondaryRole || null,
                highlightTag: member.highlightTag || null,
                type: member.type,
                imageUrl: (member as any).imageUrl || null,
                linkedin: (member as any).linkedin || null,
                github: (member as any).github || null,
                isActive: true,
                symposiumId: symposium?.id,
                sortOrder: sympCount,
            },
        });
        console.log(`  ✅ ${member.name} - ${member.primaryRole}`);
        sympCount++;
    }
    console.log(`\n📊 Symposium Team: ${sympCount} members`);

    console.log('\n🎉 Seed complete!');
    console.log(`   Total: ${clubCount + sympCount} members`);
    console.log(`   Club Team: ${clubCount}`);
    console.log(`   Symposium Team: ${sympCount}`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
