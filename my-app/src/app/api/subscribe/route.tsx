import { userSubscribe } from "@/lib/services/subscribe.services";
import { subscribeEmailSchema } from "@/lib/validations/subscribe.validation";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/utility/rateLimit";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "newsletter:subscribe", {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();

    const validatedBody = subscribeEmailSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.issues[0].message },
        { status: 400 },
      );
    }

    const follower = await userSubscribe(validatedBody.data);

    if (follower?.confirmed) {
      return NextResponse.json(
        { message: "Subscription successful" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Approve your subscription in email" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to subscribe") },
      { status: 400 },
    );
  }
}
