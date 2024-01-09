-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'customer';

-- CreateTable
CREATE TABLE "Technician" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "password" TEXT NOT NULL,
    "skill" TEXT[],
    "experience" TEXT NOT NULL,
    "requests" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technician_email_key" ON "Technician"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Technician_phone_key" ON "Technician"("phone");
