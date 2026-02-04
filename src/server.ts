// Server Entry Point

import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';
import { logger } from './utils/logger.js';
import { startPendingReminderJob } from './jobs/pendingReminder.job.js';

const PORT = parseInt(env.PORT, 10);

async function main() {
    try {
        // Test database connection
        await prisma.$connect();
        logger.info('✅ Database connected');

        // Start server
        app.listen(PORT, () => {
            logger.info(`🚀 Server running on http://localhost:${PORT}`);
            logger.info(`📚 API available at http://localhost:${PORT}/api`);
            logger.info(`🏥 Health check at http://localhost:${PORT}/api/health`);
            logger.info(`🌍 Environment: ${env.NODE_ENV}`);

            // Start background jobs
            startPendingReminderJob();
            logger.info('📧 Pending reminder job started');
        });
    } catch (error) {
        logger.error('❌ Failed to start server:', { error });
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    logger.info('Shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});

main();
