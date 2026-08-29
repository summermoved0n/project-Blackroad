import { createBooking } from "@/lib/services/booking.services";
import { bookingAPISchema } from "@/lib/validations/booking.validation";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/utility/rateLimit";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "booking:checkout", {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();

    const validatedBody = bookingAPISchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const response = await createBooking(validatedBody.data);

    return NextResponse.json(
      { message: "Your booking data was sent success", response },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to create booking") },
      { status: 400 },
    );
  }
}
