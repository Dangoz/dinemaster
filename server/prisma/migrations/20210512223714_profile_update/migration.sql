-- AlterTable
ALTER TABLE "user" ADD COLUMN     "photo" TEXT NOT NULL DEFAULT E'/thumbnail.png',
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT E'explore and conquer.. food';
