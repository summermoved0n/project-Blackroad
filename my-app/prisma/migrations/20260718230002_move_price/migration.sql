/*
  Warnings:

  - You are about to drop the column `price` on the `departures` table. All the data in the column will be lost.
  - Added the required column `price` to the `tours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "departures" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
