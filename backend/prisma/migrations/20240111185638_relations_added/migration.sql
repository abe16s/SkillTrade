-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "serviceLocation" TEXT;

-- AlterTable
ALTER TABLE "Technician" ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "skills" DROP NOT NULL,
ALTER COLUMN "skills" DROP DEFAULT,
ALTER COLUMN "skills" SET DATA TYPE TEXT,
ALTER COLUMN "educationLevel" DROP NOT NULL,
ALTER COLUMN "educationLevel" DROP DEFAULT,
ALTER COLUMN "educationLevel" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
