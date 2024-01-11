/*
  Warnings:

  - A unique constraint covering the columns `[customerId,technicianId,serviceDate]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Technician" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_customerId_technicianId_serviceDate_key" ON "Booking"("customerId", "technicianId", "serviceDate");
