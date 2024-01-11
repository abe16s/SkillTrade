-- AlterTable
ALTER TABLE "Technician" ALTER COLUMN "skills" SET NOT NULL,
ALTER COLUMN "skills" SET DEFAULT 'Not specified!',
ALTER COLUMN "skills" SET DATA TYPE TEXT,
ALTER COLUMN "educationLevel" SET NOT NULL,
ALTER COLUMN "educationLevel" SET DEFAULT 'Not specified!',
ALTER COLUMN "educationLevel" SET DATA TYPE TEXT;
