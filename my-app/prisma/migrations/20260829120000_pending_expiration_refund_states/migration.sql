ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'refund_pending';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'refund_failed';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'refund_required';

ALTER TABLE "bookings" ADD COLUMN "expiresAt" TIMESTAMP(3);
ALTER TABLE "payments" ADD COLUMN "providerRefundId" TEXT;

UPDATE "bookings"
SET "expiresAt" = "createdAt" + INTERVAL '30 minutes'
WHERE "status" = 'pending' AND "expiresAt" IS NULL;

CREATE UNIQUE INDEX "payments_providerRefundId_key" ON "payments"("providerRefundId");
