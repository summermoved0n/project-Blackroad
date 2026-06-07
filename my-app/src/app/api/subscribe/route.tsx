import { userSubscribe } from "@/lib/services/subscribe.services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const normalizedEmail = body.email.trim().toLowerCase();

    const follower = await userSubscribe({ email: normalizedEmail });

    if (follower?.confirmed)
      NextResponse.json(
        { message: "Subscription successful" },
        { status: 200 },
      );

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
