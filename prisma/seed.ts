// Prisma Seed Script - Creates initial admin and sample data
// Run: npx prisma db seed

import { PrismaClient, Role, ClubMemberType, EventCategory, TeamType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // ============================================
    // 1. CREATE ADMIN USER
    // ============================================
    const adminEmail = process.env.ADMIN_EMAIL || 'aether@iiitl.ac.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AetherAdmin@2026';

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            role: Role.ADMIN,
            name: 'AETHER Admin',
        },
    });

    console.log(`✅ Admin user created: ${admin.email}`);

    // ============================================
    // 2. CREATE WINGS
    // ============================================
    const wncWing = await prisma.wing.upsert({
        where: { slug: 'wnc' },
        update: {},
        create: {
            slug: 'wnc',
            name: 'Web & Coding Wing',
            tagline: 'Building the digital future, one line at a time',
            description: 'The Web & Coding Wing focuses on competitive programming, web development, AI/ML, and open-source contributions.',
            mission: 'Empowering students with cutting-edge programming skills and fostering a culture of innovation.',
            color: 'cyan',
            sortOrder: 1,
            focus: {
                create: [
                    { title: 'Competitive Programming' },
                    { title: 'Web Development' },
                    { title: 'AI & ML' },
                    { title: 'Hackathons' },
                    { title: 'Open Source' },
                ],
            },
            activities: {
                create: [
                    { title: 'Weekly Coding Sessions', description: 'Practice competitive programming problems together' },
                    { title: 'Hackathon Participation', description: 'Represent IIITL in national and international hackathons' },
                    { title: 'Web Dev Workshops', description: 'Hands-on sessions on React, Node.js, and modern frameworks' },
                    { title: 'Open Source Contributions', description: 'Contribute to real-world open source projects' },
                ],
            },
        },
    });

    const climateWing = await prisma.wing.upsert({
        where: { slug: 'climate' },
        update: {},
        create: {
            slug: 'climate',
            name: 'Climate Tech Wing',
            tagline: 'Technology for a sustainable tomorrow',
            description: 'The Climate Tech Wing leverages AI/ML and data science for environmental sustainability.',
            mission: 'Applying technology to address climate challenges and building solutions for a sustainable future.',
            color: 'green',
            sortOrder: 2,
            focus: {
                create: [
                    { title: 'AI for Sustainability' },
                    { title: 'Climate Research' },
                    { title: 'Environmental Data Science' },
                    { title: 'CRO Collaboration' },
                    { title: 'Green Tech Solutions' },
                ],
            },
            activities: {
                create: [
                    { title: 'Climate Data Analysis', description: 'Analyze environmental datasets for insights' },
                    { title: 'CRO Research Projects', description: 'Collaborate with Climate Research Office on real projects' },
                    { title: 'Sustainability Workshops', description: 'Learn about green technology and sustainable practices' },
                    { title: 'AI/ML for Environment', description: 'Apply machine learning to environmental problems' },
                ],
            },
        },
    });

    console.log(`✅ Wings created: ${wncWing.name}, ${climateWing.name}`);

    // ============================================
    // 3. CREATE SYMPOSIUM 2026
    // ============================================
    const symposium2026 = await prisma.symposium.upsert({
        where: { year: 2026 },
        update: {},
        create: {
            year: 2026,
            title: 'AETHER Symposium 2026',
            theme: 'Navigating the AI Frontier',
            description: 'The flagship technical fest of AETHER featuring competitions, workshops, and speaker sessions.',
            startDate: new Date('2026-02-15'),
            endDate: new Date('2026-02-16'),
            location: 'IIIT Lucknow Campus',
            venueDetails: 'Main Auditorium & Computer Labs',
            isActive: true,
            isUpcoming: true,
        },
    });

    console.log(`✅ Symposium created: ${symposium2026.title}`);

    // ============================================
    // 4. CREATE EVENTS (matching public Events page)
    // ============================================
    const events = await Promise.all([
        // A&M Coding Challenge (Algorithm & Mastery)
        prisma.event.upsert({
            where: { symposiumId_slug: { symposiumId: symposium2026.id, slug: 'am-coding-challenge' } },
            update: {},
            create: {
                symposiumId: symposium2026.id,
                title: 'A&M Coding Challenge',
                slug: 'am-coding-challenge',
                eventType: EventCategory.COMPETITION,
                teamType: TeamType.SOLO,
                description: 'Algorithm & Mastery Coding Challenge - A fast-paced coding competition where participants solve algorithmic challenges under intense time pressure.',
                longDescription: 'Test your coding speed and problem-solving skills in this thrilling competition.',
                fee: 100,
                maxSeats: 100,
                isLive: true,
                minTeamSize: 1,
                maxTeamSize: 1,
                difficulty: 'Intermediate',
                prizes: '₹15,000 (1st: ₹8000, 2nd: ₹5000, 3rd: ₹2000)',
                venue: 'Computer Lab',
                duration: '2.5 hours',
                sortOrder: 1,
            },
        }),
        // Student Showcase: AI for Sustainability
        prisma.event.upsert({
            where: { symposiumId_slug: { symposiumId: symposium2026.id, slug: 'student-showcase-ai' } },
            update: {},
            create: {
                symposiumId: symposium2026.id,
                title: 'Student Showcase: AI for Sustainability',
                slug: 'student-showcase-ai',
                eventType: EventCategory.COMPETITION,
                teamType: TeamType.TEAM,
                description: 'Present your AI-powered solutions addressing sustainability challenges.',
                longDescription: 'Showcase innovative projects that leverage artificial intelligence to create positive environmental impact.',
                fee: 200,
                maxSeats: 30,
                isLive: true,
                minTeamSize: 2,
                maxTeamSize: 4,
                difficulty: 'Advanced',
                prizes: '₹25,000 (1st: ₹15000 + Incubation, 2nd: ₹7000, 3rd: ₹3000)',
                venue: 'Seminar Hall A',
                duration: '15 mins per team',
                sortOrder: 2,
            },
        }),
        // Student Showcase: Data-Driven Sustainability
        prisma.event.upsert({
            where: { symposiumId_slug: { symposiumId: symposium2026.id, slug: 'student-showcase-data' } },
            update: {},
            create: {
                symposiumId: symposium2026.id,
                title: 'Student Showcase: Data-Driven Sustainability',
                slug: 'student-showcase-data',
                eventType: EventCategory.COMPETITION,
                teamType: TeamType.TEAM,
                description: 'Present data-driven solutions that tackle real-world sustainability problems.',
                longDescription: 'Use data science, analytics, and visualization to create impactful solutions.',
                fee: 200,
                maxSeats: 30,
                isLive: true,
                minTeamSize: 2,
                maxTeamSize: 4,
                difficulty: 'Advanced',
                prizes: '₹25,000 (1st: ₹15000 + Incubation, 2nd: ₹7000, 3rd: ₹3000)',
                venue: 'Seminar Hall B',
                duration: '15 mins per team',
                sortOrder: 3,
            },
        }),
        // Linux Workshop
        prisma.event.upsert({
            where: { symposiumId_slug: { symposiumId: symposium2026.id, slug: 'linux-workshop' } },
            update: {},
            create: {
                symposiumId: symposium2026.id,
                title: 'Hands-On Workshop: Linux (LFDT)',
                slug: 'linux-workshop',
                eventType: EventCategory.WORKSHOP,
                teamType: TeamType.SOLO,
                description: 'A comprehensive hands-on workshop covering Linux fundamentals.',
                longDescription: 'Learn the skills that power modern software development. Master the command line.',
                fee: 50,
                maxSeats: 50,
                isLive: true,
                minTeamSize: 1,
                maxTeamSize: 1,
                difficulty: 'Beginner',
                venue: 'Computer Lab 2',
                duration: '1.5 hours',
                sortOrder: 10,
            },
        }),
        // Keynote
        prisma.event.upsert({
            where: { symposiumId_slug: { symposiumId: symposium2026.id, slug: 'keynote-ai-climate' } },
            update: {},
            create: {
                symposiumId: symposium2026.id,
                title: 'Keynote: AI, Climate & The Next Decade',
                slug: 'keynote-ai-climate',
                eventType: EventCategory.TALK,
                teamType: TeamType.SOLO,
                description: 'The prime time keynote address exploring the intersection of AI and climate action.',
                longDescription: 'A visionary talk on how AI will shape our response to climate challenges.',
                fee: 0,
                maxSeats: 500,
                isLive: true,
                minTeamSize: 1,
                maxTeamSize: 1,
                difficulty: 'All Levels',
                venue: 'Main Auditorium',
                duration: '1 hour',
                sortOrder: 28,
            },
        }),
    ]);

    console.log(`✅ Events created: ${events.length} events (run sync-events.ts for all 13)`);

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
