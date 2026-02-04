-- AlterTable
ALTER TABLE "email_logs" ADD COLUMN     "error" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'SENT';
