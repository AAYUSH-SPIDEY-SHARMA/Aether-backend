-- AlterTable
ALTER TABLE "wings" ADD COLUMN     "logoCrop" TEXT;

-- CreateTable
CREATE TABLE "wing_gallery_images" (
    "id" TEXT NOT NULL,
    "wingId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageCrop" TEXT,
    "title" TEXT NOT NULL,
    "year" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wing_gallery_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wing_gallery_images" ADD CONSTRAINT "wing_gallery_images_wingId_fkey" FOREIGN KEY ("wingId") REFERENCES "wings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
