/*
  Warnings:

  - You are about to alter the column `rating` on the `tours` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,1)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `tours` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "tours" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
