/*
  Warnings:

  - You are about to drop the column `capacity` on the `departures` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "departures" DROP COLUMN "capacity";

-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "capacity" INTEGER NOT NULL;
