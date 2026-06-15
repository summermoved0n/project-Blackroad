/*
  Warnings:

  - Added the required column `propertyType` to the `tours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toursType` to the `tours` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `tours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('hotels', 'cottages', 'chalet');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('mountains', 'lakes');

-- CreateEnum
CREATE TYPE "ToursType" AS ENUM ('individual', 'group');

-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "toursType" "ToursType" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Categories" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "subscribe" BOOLEAN NOT NULL DEFAULT false;
