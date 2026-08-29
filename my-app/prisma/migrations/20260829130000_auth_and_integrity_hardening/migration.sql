ALTER TABLE "users"
ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "reviews"
ADD COLUMN "bookingId" INTEGER;

CREATE UNIQUE INDEX "reviews_bookingId_key" ON "reviews"("bookingId");

ALTER TABLE "reviews"
ADD CONSTRAINT "reviews_bookingId_fkey"
FOREIGN KEY ("bookingId") REFERENCES "bookings"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX "bookings_active_user_departure_key"
ON "bookings"("userId", "departureId")
WHERE "status" IN ('pending', 'confirmed');
