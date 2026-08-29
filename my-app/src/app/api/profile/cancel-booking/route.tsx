import { cancelBooking } from "@/lib/services/profile.services";
import { cancelBookingSchema } from "@/lib/validations/booking.validation";
import { NextResponse } from "next/server";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedBody = cancelBookingSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    await cancelBooking(validatedBody.data);

    return NextResponse.json(
      { message: "Booking canceled successfully." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to cancel booking") },
      { status: 400 },
    );
  }
}
