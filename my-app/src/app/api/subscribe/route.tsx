import { userSubscribe } from "@/lib/services/subscribe.services";
import { subscribeEmailSchema } from "@/lib/validations/subscribe.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
