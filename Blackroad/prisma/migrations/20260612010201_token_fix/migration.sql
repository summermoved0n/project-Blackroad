/*
  Warnings:

  - You are about to drop the column `token` on the `newsletter_subscribers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "newsletter_subscribers_token_key";

-- DropIndex
DROP INDEX "users_resetPasswordToken_key";

-- AlterTable
ALTER TABLE "newsletter_subscribers" DROP COLUMN "token",
ADD COLUMN     "verificationToken" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "verificationToken" DROP NOT NULL;
