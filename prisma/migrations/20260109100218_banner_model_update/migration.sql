/*
  Warnings:

  - You are about to drop the column `bannerId` on the `BannerImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BannerImage" DROP CONSTRAINT "BannerImage_bannerId_fkey";

-- AlterTable
ALTER TABLE "BannerImage" DROP COLUMN "bannerId";
