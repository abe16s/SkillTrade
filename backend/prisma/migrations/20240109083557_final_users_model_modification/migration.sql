/*
  Warnings:

  - You are about to drop the column `skill` on the `Technician` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Technician" DROP COLUMN "skill",
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "experience" DROP NOT NULL,
ALTER COLUMN "requests" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "lastLogin" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastLogin" DROP DEFAULT,
ALTER COLUMN "requests" SET DEFAULT ARRAY[]::JSONB[];
