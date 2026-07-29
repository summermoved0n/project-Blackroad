/*
  Warnings:

  - Added the required column `availableSeats` to the `departures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `departures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `tours` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Province" AS ENUM ('alberta', 'british_columbia', 'manitoba', 'new_brunswick', 'newfoundland_and_labrador', 'northwest_territories', 'nova_scotia', 'nunavut', 'ontario', 'prince_edward_island', 'quebec', 'saskatchewan', 'yukon');

-- AlterTable
ALTER TABLE "departures" ADD COLUMN     "availableSeats" INTEGER NOT NULL,
ADD COLUMN     "capacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "province" "Province" NOT NULL;
