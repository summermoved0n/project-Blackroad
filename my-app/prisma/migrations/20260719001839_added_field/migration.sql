/*
  Warnings:

  - Added the required column `departureCountry` to the `departures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "departures" ADD COLUMN     "departureCountry" TEXT NOT NULL;
