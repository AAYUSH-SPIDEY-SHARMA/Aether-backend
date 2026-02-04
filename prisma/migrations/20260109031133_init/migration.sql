-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COORDINATOR', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "ClubMemberType" AS ENUM ('FACULTY', 'CLUB_COORDINATOR', 'SYMPOSIUM_COMMITTEE');

-- CreateEnum
CREATE TYPE "SponsorTier" AS ENUM ('TITLE', 'GOLD', 'SILVER', 'PARTNER');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('COMPETITION', 'WORKSHOP', 'TALK', 'PANEL');

-- CreateEnum
CREATE TYPE "TeamType" AS ENUM ('SOLO', 'TEAM');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PARTICIPANT',
    "name" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wings" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL,
    "mission" TEXT,
    "logoUrl" TEXT,
    "color" TEXT NOT NULL DEFAULT 'cyan',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wing_focus" (
    "id" TEXT NOT NULL,
    "wingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "wing_focus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wing_activities" (
    "id" TEXT NOT NULL,
    "wingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "wing_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "imageUrl" TEXT,
    "primaryRole" TEXT NOT NULL,
    "secondaryRole" TEXT,
    "highlightTag" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "email" TEXT,
    "type" "ClubMemberType" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "wingId" TEXT,
    "symposiumId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "club_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symposiums" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "theme" TEXT,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "venueDetails" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isUpcoming" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "symposiums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_days" (
    "id" TEXT NOT NULL,
    "symposiumId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dayNumber" INTEGER NOT NULL,

    CONSTRAINT "schedule_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_slots" (
    "id" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "venue" TEXT,
    "type" TEXT NOT NULL DEFAULT 'general',

    CONSTRAINT "schedule_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsors" (
    "id" TEXT NOT NULL,
    "symposiumId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "website" TEXT,
    "tier" "SponsorTier" NOT NULL DEFAULT 'PARTNER',

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "symposiumId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "eventType" "EventCategory" NOT NULL,
    "teamType" "TeamType" NOT NULL DEFAULT 'SOLO',
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "rules" TEXT,
    "fee" INTEGER NOT NULL DEFAULT 0,
    "maxSeats" INTEGER,
    "imageUrl" TEXT,
    "venue" TEXT,
    "duration" TEXT,
    "difficulty" TEXT,
    "prizes" TEXT,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "minTeamSize" INTEGER NOT NULL DEFAULT 1,
    "maxTeamSize" INTEGER NOT NULL DEFAULT 1,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" INTEGER NOT NULL,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "createdByEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "isLeader" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wings_slug_key" ON "wings"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "symposiums_year_key" ON "symposiums"("year");

-- CreateIndex
CREATE UNIQUE INDEX "events_symposiumId_slug_key" ON "events"("symposiumId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_razorpayOrderId_key" ON "registrations"("razorpayOrderId");

-- AddForeignKey
ALTER TABLE "wing_focus" ADD CONSTRAINT "wing_focus_wingId_fkey" FOREIGN KEY ("wingId") REFERENCES "wings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wing_activities" ADD CONSTRAINT "wing_activities_wingId_fkey" FOREIGN KEY ("wingId") REFERENCES "wings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_wingId_fkey" FOREIGN KEY ("wingId") REFERENCES "wings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_symposiumId_fkey" FOREIGN KEY ("symposiumId") REFERENCES "symposiums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_days" ADD CONSTRAINT "schedule_days_symposiumId_fkey" FOREIGN KEY ("symposiumId") REFERENCES "symposiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_slots" ADD CONSTRAINT "schedule_slots_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "schedule_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_symposiumId_fkey" FOREIGN KEY ("symposiumId") REFERENCES "symposiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_symposiumId_fkey" FOREIGN KEY ("symposiumId") REFERENCES "symposiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
