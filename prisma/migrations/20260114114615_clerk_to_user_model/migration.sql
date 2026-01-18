-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkId" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
