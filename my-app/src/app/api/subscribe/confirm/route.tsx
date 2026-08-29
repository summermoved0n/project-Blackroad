import { subscribeConfirm } from "@/lib/services/subscribe.services";
import { getPublicErrorMessage } from "@/lib/utility/publicError";
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
    return NextResponse.json(
      {
        message: getPublicErrorMessage(
          error,
          "Subscription confirmation failed",
        ),
      },
      { status: 404 },
    );
  }
}
