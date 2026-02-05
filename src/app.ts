// Express Application Setup

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { logger } from './utils/logger.js';

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - allows production, localhost, and all Vercel previews
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:4173',
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (server-to-server, Postman, curl)
        if (!origin) return callback(null, true);

        // Allow exact matches from allowedOrigins
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow ALL Vercel preview deployments
        if (origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }

        // Block other origins
        return callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing - raw body needed for Razorpay webhook
app.use(express.json({
    verify: (req: express.Request, _res, buf) => {
        // Store raw body for webhook signature verification
        if (req.headers['x-razorpay-signature']) {
            (req as express.Request & { rawBody: Buffer }).rawBody = buf;
        }
    },
}));
app.use(express.urlencoded({ extended: true }));

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
    app.use((req, _res, next) => {
        logger.debug(`${req.method} ${req.path}`);
        next();
    });
}

// API routes
app.use('/api', routes);

// Root route
app.get('/', (_req, res) => {
    res.json({
        name: 'AETHER Backend',
        version: '1.0.0',
        docs: '/api/health',
    });
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
