import { subscribeConfirm } from "@/lib/services/subscribe.services";
import { subscribeConfirmSchema } from "@/lib/validations/subscribe.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = subscribeConfirmSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    await subscribeConfirm(body);

    return NextResponse.json(
      { message: "Subscription success" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
