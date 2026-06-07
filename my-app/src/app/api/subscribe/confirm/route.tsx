import { subscribeConfirm } from "@/lib/services/subscribe.services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await subscribeConfirm(body);

    return NextResponse.json(
      { message: "Subscribtion success" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
