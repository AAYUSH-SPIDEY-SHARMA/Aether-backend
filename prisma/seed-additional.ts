// Seed FAQs, Speakers, Team Members
import { PrismaClient, ClubMemberType } from '@prisma/client';
const prisma = new PrismaClient();

async function seedAdditionalData() {
    console.log('🌱 Seeding additional data...');

    // Get active symposium
    const symposium = await prisma.symposium.findFirst({ where: { isActive: true } });
    if (!symposium) {
        console.log('❌ No active symposium found');
        return;
    }
    console.log(`📅 Using symposium: ${symposium.title}`);

    // ============================================
    // SEED FAQs
    // ============================================
    const faqs = [
        { category: 'General', question: 'What is AETHER Symposium?', answer: 'AETHER is an annual technical symposium featuring competitions, workshops, hackathons, and talks from industry leaders. It brings together students from across the country to innovate, compete, and learn.', sortOrder: 1 },
        { category: 'General', question: 'When and where is the event?', answer: 'AETHER 2026 will be held on February 15-16, 2026 at IIIT Lucknow Campus. All indoor events will be held in the main academic block.', sortOrder: 2 },
        { category: 'Registration', question: 'How do I register for events?', answer: 'Click on "Register Now" and select the events you wish to participate in. Fill out the registration form and complete the payment. You\'ll receive a confirmation email with your registration details.', sortOrder: 3 },
        { category: 'Registration', question: 'Can I register for multiple events?', answer: 'Yes! You can register for multiple events as long as their timings don\'t overlap. Check the schedule page to plan your participation accordingly.', sortOrder: 4 },
        { category: 'Registration', question: 'Is there a team registration process?', answer: 'For team events, one member registers as the team leader and adds team member details during registration. All team members will receive confirmation emails.', sortOrder: 5 },
        { category: 'Payment', question: 'What payment methods are accepted?', answer: 'We accept UPI (GPay, PhonePe, Paytm), debit/credit cards, and net banking through our secure Razorpay payment gateway.', sortOrder: 6 },
        { category: 'Payment', question: 'What is the refund policy?', answer: 'Refunds are available up to 7 days before the event with a 10% processing fee. No refunds within 7 days of the event.', sortOrder: 7 },
        { category: 'Events', question: 'Do I need to bring my own laptop?', answer: 'For hackathons and coding events, yes, you need your own laptop. For other events, necessary equipment will be provided.', sortOrder: 8 },
        { category: 'Events', question: 'What if I\'m from a different college?', answer: 'AETHER is open to students from all colleges! Carry your valid college ID card for verification.', sortOrder: 9 },
        { category: 'Logistics', question: 'Is accommodation available?', answer: 'Yes, limited accommodation is available on a first-come-first-served basis at ₹500/night.', sortOrder: 10 },
        { category: 'Logistics', question: 'Will food be provided?', answer: 'Registered participants get access to the food court with discounted rates. For hackathon participants, meals are included.', sortOrder: 11 },
    ];

    for (const faq of faqs) {
        await prisma.fAQ.create({
            data: { ...faq, symposiumId: symposium.id, isActive: true }
        }).catch(() => console.log(`FAQ exists: ${faq.question.substring(0, 30)}...`));
    }
    console.log(`✅ FAQs seeded: ${faqs.length}`);

    // ============================================
    // SEED SPEAKERS
    // ============================================
    const speakers = [
        { name: 'Dr. Rajesh Kumar', title: 'AI Research Lead', company: 'Google DeepMind', bio: 'Leading researcher in artificial intelligence with 15+ years of experience. Published 50+ papers in top conferences.', topics: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'], isFeatured: true, sortOrder: 1 },
        { name: 'Priya Sundaram', title: 'Engineering Director', company: 'Microsoft', bio: 'Leads Azure cloud infrastructure team. Champion of diversity in tech with 12+ years at Microsoft.', topics: ['Cloud Computing', 'Distributed Systems', 'Tech Leadership'], isFeatured: true, sortOrder: 2 },
        { name: 'Arjun Mehta', title: 'Founder & CEO', company: 'TechStartup.io', bio: 'Serial entrepreneur with 3 successful exits. Y Combinator alum and angel investor.', topics: ['Entrepreneurship', 'Startups', 'Product Development'], isFeatured: true, sortOrder: 3 },
        { name: 'Dr. Sneha Patel', title: 'Cybersecurity Expert', company: 'IBM Security', bio: 'Expert in ethical hacking and network security. Has helped protect Fortune 500 companies from cyber threats.', topics: ['Cybersecurity', 'Ethical Hacking', 'Network Security'], isFeatured: true, sortOrder: 4 },
        { name: 'Vikram Rao', title: 'Senior Blockchain Developer', company: 'Polygon', bio: 'Core contributor to Polygon network. Passionate about Web3 and decentralization.', topics: ['Blockchain', 'Web3', 'Smart Contracts'], isFeatured: false, sortOrder: 5 },
        { name: 'Ananya Krishnan', title: 'UX Design Lead', company: 'Figma', bio: 'Award-winning designer who has shaped products used by millions.', topics: ['UX Design', 'Product Design', 'Design Systems'], isFeatured: false, sortOrder: 6 },
    ];

    for (const speaker of speakers) {
        await prisma.speaker.create({
            data: { ...speaker, symposiumId: symposium.id, isActive: true }
        }).catch(() => console.log(`Speaker exists: ${speaker.name}`));
    }
    console.log(`✅ Speakers seeded: ${speakers.length}`);

    // ============================================
    // SEED TEAM MEMBERS
    // ============================================
    const team = [
        { name: 'Dr. Sirsendu Barman', program: 'Computer Science & Engineering', primaryRole: 'Faculty Advisor', type: ClubMemberType.FACULTY, linkedin: 'https://linkedin.com/in/sirsendu-sekhar-barman-14a9ab80', sortOrder: 1, imageUrl: '/images/team/sirsendu sir.jpg' },
        { name: 'Dr. Subhra Jain', program: 'Information Technology', primaryRole: 'Faculty Advisor', type: ClubMemberType.FACULTY, sortOrder: 2, imageUrl: '/images/team/dr.-shubhra-jain.png' },
        { name: 'Anamitra Majumder', program: 'M.Sc. AI/ML 2024', primaryRole: 'Overall Coordinator', type: ClubMemberType.CLUB_COORDINATOR, linkedin: 'https://linkedin.com/in/anamitra-majumder-b59b81330', sortOrder: 3, imageUrl: '/images/team/Anamitra.png' },
        { name: 'Kashish Nagar', program: 'M.Sc. DS 2024', primaryRole: 'Overall Coordinator', type: ClubMemberType.CLUB_COORDINATOR, sortOrder: 4 },
        { name: 'Aayush Sharma', program: 'M.Sc. AI/ML 2024', primaryRole: 'WnC Wing Coordinator', type: ClubMemberType.CLUB_COORDINATOR, linkedin: 'https://linkedin.com/in/aayush-sharma-661179330', sortOrder: 5, imageUrl: '/images/wings/Aayush-WnC.jpg' },
        { name: 'Jatin', program: 'M.Sc. AI/ML 2024', primaryRole: 'WnC Wing Coordinator', type: ClubMemberType.CLUB_COORDINATOR, linkedin: 'https://linkedin.com/in/jatingyass', sortOrder: 6, imageUrl: '/images/team/Jatin.jpg' },
        { name: 'Sahil Rafaliya', program: 'M.Sc. DS (CDA) 2024', primaryRole: 'Climate Tech Coordinator', type: ClubMemberType.CLUB_COORDINATOR, sortOrder: 7 },
    ];

    for (const member of team) {
        await prisma.clubMember.create({
            data: { ...member, isActive: true }
        }).catch(() => console.log(`Member exists: ${member.name}`));
    }
    console.log(`✅ Team seeded: ${team.length}`);

    console.log('🎉 Additional data seeding completed!');
}

seedAdditionalData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
