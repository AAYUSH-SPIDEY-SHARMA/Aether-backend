// Sync events from mock data to database
import { PrismaClient, EventCategory, TeamType } from '@prisma/client';
const prisma = new PrismaClient();

async function syncEvents() {
    console.log('🔄 Syncing events from mock data...');

    // Get active symposium
    const symposium = await prisma.symposium.findFirst({ where: { isActive: true } });
    if (!symposium) {
        console.log('❌ No active symposium found');
        return;
    }
    console.log(`📅 Using symposium: ${symposium.title} (ID: ${symposium.id})`);

    // Delete all existing events for this symposium
    const deleted = await prisma.event.deleteMany({ where: { symposiumId: symposium.id } });
    console.log(`🗑️ Deleted ${deleted.count} old events`);

    // New events from mock data (matching the public page)
    const newEvents = [
        // A&M Coding Challenge (Algorithm & Mastery)
        {
            title: 'A&M Coding Challenge',
            slug: 'am-coding-challenge',
            eventType: EventCategory.COMPETITION,
            teamType: TeamType.SOLO,
            description: 'Algorithm & Mastery Coding Challenge - A fast-paced coding competition where participants solve algorithmic challenges under intense time pressure.',
            longDescription: 'Test your coding speed and problem-solving skills in this thrilling competition. Solve 5 problems in 45 minutes in the preliminary round, then compete for the title in the finals.',
            fee: 100,
            maxSeats: 100,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'Intermediate',
            prizes: '₹15,000 (1st: ₹8000, 2nd: ₹5000, 3rd: ₹2000)',
            venue: 'Computer Lab',
            duration: '2.5 hours',
            isLive: true,
            sortOrder: 1
        },
        {
            title: 'Student Showcase: AI for Sustainability',
            slug: 'student-showcase-ai',
            eventType: EventCategory.COMPETITION,
            teamType: TeamType.TEAM,
            description: 'Present your AI-powered solutions addressing sustainability challenges.',
            longDescription: 'Showcase innovative projects that leverage artificial intelligence to create positive environmental impact. Working prototype required.',
            fee: 200,
            maxSeats: 30,
            minTeamSize: 2,
            maxTeamSize: 4,
            difficulty: 'Advanced',
            prizes: '₹25,000 (1st: ₹15000 + Incubation, 2nd: ₹7000, 3rd: ₹3000)',
            venue: 'Seminar Hall A',
            duration: '15 mins per team',
            isLive: true,
            sortOrder: 2
        },
        {
            title: 'Student Showcase: Data-Driven Sustainability',
            slug: 'student-showcase-data',
            eventType: EventCategory.COMPETITION,
            teamType: TeamType.TEAM,
            description: 'Present data-driven solutions that tackle real-world sustainability problems.',
            longDescription: 'Use data science, analytics, and visualization to create impactful solutions for environmental challenges.',
            fee: 200,
            maxSeats: 30,
            minTeamSize: 2,
            maxTeamSize: 4,
            difficulty: 'Advanced',
            prizes: '₹25,000 (1st: ₹15000 + Incubation, 2nd: ₹7000, 3rd: ₹3000)',
            venue: 'Seminar Hall B',
            duration: '15 mins per team',
            isLive: true,
            sortOrder: 3
        },
        // WORKSHOP
        {
            title: 'Hands-On Workshop: Linux (LFDT)',
            slug: 'linux-workshop',
            eventType: EventCategory.WORKSHOP,
            teamType: TeamType.SOLO,
            description: 'A comprehensive hands-on workshop covering Linux fundamentals and command-line operations.',
            longDescription: 'Learn the skills that power modern software development. Master the command line, file system navigation, and essential developer tools.',
            fee: 50,
            maxSeats: 50,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'Beginner',
            prizes: null,
            venue: 'Computer Lab 2',
            duration: '1.5 hours',
            isLive: true,
            sortOrder: 10
        },
        // TALKS
        {
            title: 'Talk: AI for Climate Modelling',
            slug: 'talk-ai-climate',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'Explore how AI is revolutionizing climate modelling approaches.',
            longDescription: 'Learn about cutting-edge ML techniques used to predict climate patterns and inform policy decisions.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall A',
            duration: '25 mins',
            isLive: true,
            sortOrder: 20
        },
        {
            title: 'Talk: ML for Environmental Monitoring',
            slug: 'talk-ml-environment',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'Discover how ML is applied to environmental monitoring systems.',
            longDescription: 'From satellite imagery analysis to IoT sensor networks, learn about real-world applications protecting our environment.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall A',
            duration: '25 mins',
            isLive: true,
            sortOrder: 21
        },
        {
            title: 'Talk: Sustainable Data Pipelines',
            slug: 'talk-data-pipelines',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'Learn about building sustainable and energy-efficient data pipelines.',
            longDescription: 'Explore best practices for reducing the carbon footprint of data infrastructure in modern industry.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall B',
            duration: '25 mins',
            isLive: true,
            sortOrder: 22
        },
        {
            title: 'Talk: Low-Carbon AI & Green Compute',
            slug: 'talk-green-ai',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'Explore innovative approaches to reducing the environmental impact of AI systems.',
            longDescription: 'Learn about green computing architectures and energy-efficient machine learning.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall B',
            duration: '25 mins',
            isLive: true,
            sortOrder: 23
        },
        {
            title: 'Case Study: Renewable Energy Forecasting',
            slug: 'case-study-energy',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'A detailed case study on using data science for renewable energy forecasting.',
            longDescription: 'Learn how predictive models help optimize solar and wind energy generation.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'Intermediate',
            prizes: null,
            venue: 'Auditorium - Hall A',
            duration: '25 mins',
            isLive: true,
            sortOrder: 24
        },
        {
            title: 'Innovation Spotlight: Climate-Tech Startups',
            slug: 'innovation-spotlight',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'Discover the most promising climate-tech startups and their innovative solutions.',
            longDescription: 'Learn about emerging technologies and business models addressing climate change.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall B',
            duration: '25 mins',
            isLive: true,
            sortOrder: 25
        },
        {
            title: 'Panel: Frontiers in Climate Informatics',
            slug: 'panel-climate-informatics',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'A panel discussion featuring experts discussing the frontiers of climate informatics.',
            longDescription: 'Explore cutting-edge research and future directions in this critical field.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall A',
            duration: '35 mins',
            isLive: true,
            sortOrder: 26
        },
        {
            title: 'Panel: AI for Sustainable Industry',
            slug: 'panel-industrial',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'Industry leaders discuss how AI is driving sustainable transformation.',
            longDescription: 'Learn about real-world implementations and success stories across manufacturing, logistics, and supply chains.',
            fee: 0,
            maxSeats: 200,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Auditorium - Hall B',
            duration: '35 mins',
            isLive: true,
            sortOrder: 27
        },
        {
            title: 'Keynote: AI, Climate & The Next Decade',
            slug: 'keynote-ai-climate',
            eventType: EventCategory.TALK,
            teamType: TeamType.SOLO,
            description: 'The prime time keynote address exploring the intersection of AI and climate action.',
            longDescription: 'A visionary talk on how AI will shape our response to climate challenges in the coming decade.',
            fee: 0,
            maxSeats: 500,
            minTeamSize: 1,
            maxTeamSize: 1,
            difficulty: 'All Levels',
            prizes: null,
            venue: 'Main Auditorium',
            duration: '1 hour',
            isLive: true,
            sortOrder: 28
        }
    ];

    // Insert new events
    for (const event of newEvents) {
        await prisma.event.create({
            data: {
                ...event,
                symposiumId: symposium.id
            }
        });
    }

    console.log(`✅ Created ${newEvents.length} new events`);
    console.log('🎉 Event sync completed!');
}

syncEvents()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
