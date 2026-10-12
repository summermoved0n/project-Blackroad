import { userVerify } from "@/lib/services/auth.services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      typeof body?.verificationToken !== "string" ||
      !body.verificationToken.trim()
    ) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 },
      );
    }

    await userVerify(body);

    return NextResponse.json(
      { message: "User verify success" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
