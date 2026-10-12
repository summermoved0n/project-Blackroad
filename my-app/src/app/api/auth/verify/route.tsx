import { userVerify } from "@/lib/services/auth.services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
