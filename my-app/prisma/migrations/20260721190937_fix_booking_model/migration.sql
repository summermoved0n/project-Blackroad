/*
  Warnings:

  - You are about to drop the column `guests` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `adults` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `children` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "guests",
ADD COLUMN     "adults" INTEGER NOT NULL,
ADD COLUMN     "children" INTEGER NOT NULL;
