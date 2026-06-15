/*
  Warnings:

  - Added the required column `fullName` to the `booking_customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking_customers" ADD COLUMN     "fullName" TEXT NOT NULL;
