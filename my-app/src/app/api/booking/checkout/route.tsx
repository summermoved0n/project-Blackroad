import { createBooking } from "@/lib/services/booking.services";
import { bookingAPISchema } from "@/lib/validations/booking.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = bookingAPISchema.safeParse(body);

    console.log(validatedBody);
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
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
