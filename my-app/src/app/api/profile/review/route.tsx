import { leaveReview } from "@/lib/services/profile.services";
import { createReviewSchema } from "@/lib/validations/booking.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = createReviewSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.issues[0].message },
        { status: 400 },
      );
    }

    await leaveReview(validatedBody.data);

    return NextResponse.json(
      {
        message: "Review submitted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
