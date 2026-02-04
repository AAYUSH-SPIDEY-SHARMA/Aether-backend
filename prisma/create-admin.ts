// Quick script to create/update admin user
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
    const hash = await bcrypt.hash('AetherAdmin@2026', 12);

    const user = await prisma.user.upsert({
        where: { email: 'aether@iiitl.ac.in' },
        update: { password: hash, role: 'ADMIN' },
        create: {
            email: 'aether@iiitl.ac.in',
            password: hash,
            role: 'ADMIN',
            name: 'AETHER Admin'
        }
    });

    console.log('✅ Admin user created/updated:', user.email, 'Role:', user.role);
    await prisma.$disconnect();
}

createAdmin();
