/*
  Warnings:

  - Added the required column `bannerId` to the `BannerImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BannerImage" ADD COLUMN     "bannerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BannerImage" ADD CONSTRAINT "BannerImage_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
