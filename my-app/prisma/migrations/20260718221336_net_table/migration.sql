/*
  Warnings:

  - You are about to drop the column `dateOfArrival` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfDeparture` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `tourDates` on the `tours` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DepartureStatus" AS ENUM ('available', 'sold_out', 'cancelled', 'completed');

-- AlterTable
ALTER TABLE "tours" DROP COLUMN "dateOfArrival",
DROP COLUMN "dateOfDeparture",
DROP COLUMN "duration",
DROP COLUMN "price",
DROP COLUMN "rating",
DROP COLUMN "tourDates";

-- CreateTable
CREATE TABLE "departures" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "status" "DepartureStatus" NOT NULL,

    CONSTRAINT "departures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "departures" ADD CONSTRAINT "departures_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;
