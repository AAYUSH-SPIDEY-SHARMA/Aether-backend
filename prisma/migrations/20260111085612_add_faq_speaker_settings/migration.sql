/*
  Warnings:

  - The `rules` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "category" TEXT,
ADD COLUMN     "coordinators" JSONB,
ADD COLUMN     "eligibility" JSONB,
ADD COLUMN     "evaluationCriteria" JSONB,
ADD COLUMN     "eventSchedule" JSONB,
ADD COLUMN     "prizeDetails" JSONB,
ADD COLUMN     "prizePool" INTEGER,
ADD COLUMN     "rounds" JSONB,
ADD COLUMN     "tagline" TEXT,
DROP COLUMN "rules",
ADD COLUMN     "rules" JSONB;

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "symposiumId" TEXT,
    "category" TEXT NOT NULL DEFAULT 'General',
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speakers" (
    "id" TEXT NOT NULL,
    "symposiumId" TEXT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "bio" TEXT,
    "imageUrl" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "topics" JSONB,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speakers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings"("key");

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_symposiumId_fkey" FOREIGN KEY ("symposiumId") REFERENCES "symposiums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_symposiumId_fkey" FOREIGN KEY ("symposiumId") REFERENCES "symposiums"("id") ON DELETE SET NULL ON UPDATE CASCADE;
