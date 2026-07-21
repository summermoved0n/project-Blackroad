/*
  Warnings:

  - You are about to drop the column `endDate` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `departureId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "departureId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "departures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
