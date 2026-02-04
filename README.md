# AETHER Backend

Production backend for AETHER Club - IIIT Lucknow.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Authentication**: JWT
- **Payments**: Razorpay
- **Storage**: Cloudinary

## Quick Start

### 1. Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- pnpm/npm/yarn

### 2. Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your actual values

# Start PostgreSQL (Docker)
docker-compose up -d

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (creates admin user)
npm run db:seed

# Start development server
npm run dev
```

### 3. Environment Variables

```env
DATABASE_URL=postgresql://aether:aether_secret@localhost:5432/aether_db
JWT_ACCESS_SECRET=your_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_key_min_32_chars
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
```

## API Routes

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/wings` | List all wings |
| GET | `/api/team` | Get club team |
| GET | `/api/symposium/active` | Get active symposium |
| GET | `/api/events/:symposiumId` | List events |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh tokens |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current user |

### Protected (Requires Auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registration/create` | Register for event |
| GET | `/api/registration/my` | My registrations |
| GET | `/api/registration/status/:id` | Check status |
| POST | `/api/payments/create-order` | Create Razorpay order |
| GET | `/api/payments/verify/:orderId` | Verify payment |

### Admin (Requires Admin Role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/wing` | Create wing |
| POST | `/api/admin/team` | Add team member |
| POST | `/api/admin/symposium` | Create symposium |
| POST | `/api/admin/event` | Create event |
| GET | `/api/admin/registrations` | All registrations |

## Payment Flow

1. Frontend calls `POST /api/payments/create-order`
2. Backend creates Razorpay order, stores with PENDING status
3. User completes payment on Razorpay checkout
4. Razorpay sends webhook to `POST /api/payments/webhook`
5. Backend verifies signature, updates status to SUCCESS/FAILED
6. Frontend polls `GET /api/registration/status/:id`

> ⚠️ **CRITICAL**: Frontend NEVER marks payment as success. Only webhook updates DB.

## Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## Project Structure

```
backend/
├── src/
│   ├── config/         # DB, env, Razorpay, Cloudinary
│   ├── middlewares/    # Auth, admin, error handling
│   ├── modules/        # Feature modules
│   │   ├── auth/
│   │   ├── users/
│   │   ├── wings/
│   │   ├── team/
│   │   ├── symposium/
│   │   ├── events/
│   │   ├── registration/
│   │   ├── payments/
│   │   └── admin/
│   ├── utils/          # JWT, logger, validators
│   ├── routes.ts       # Route aggregation
│   ├── app.ts          # Express app
│   └── server.ts       # Entry point
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Admin seeding
└── docker-compose.yml  # PostgreSQL
```

## License

IIIT Lucknow - AETHER Club © 2026
