-- AlterTable
ALTER TABLE "Technician" ADD COLUMN     "additionalBio" TEXT,
ADD COLUMN     "availableLocation" TEXT,
ADD COLUMN     "educationLevel" TEXT[] DEFAULT ARRAY[]::TEXT[];
