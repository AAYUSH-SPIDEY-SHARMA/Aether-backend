-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "reminderSent" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "email_logs" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT,
    "toEmail" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_logs" ADD CONSTRAINT "email_logs_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
