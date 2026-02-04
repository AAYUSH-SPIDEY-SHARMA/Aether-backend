/*
  Warnings:

  - The values [SYMPOSIUM_COMMITTEE] on the enum `ClubMemberType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClubMemberType_new" AS ENUM ('FACULTY', 'CLUB_COORDINATOR', 'WING_COORDINATOR', 'CORE_MEMBER', 'SYMPOSIUM_COORDINATOR', 'SYMPOSIUM_CORE', 'SYMPOSIUM_VOLUNTEER');
ALTER TABLE "club_members" ALTER COLUMN "type" TYPE "ClubMemberType_new" USING ("type"::text::"ClubMemberType_new");
ALTER TYPE "ClubMemberType" RENAME TO "ClubMemberType_old";
ALTER TYPE "ClubMemberType_new" RENAME TO "ClubMemberType";
DROP TYPE "ClubMemberType_old";
COMMIT;
