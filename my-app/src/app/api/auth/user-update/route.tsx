import { userUpdateInfo } from "@/lib/services/auth.services";
import { editUserInfoSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedBody = editUserInfoSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.issues[0].message },
        { status: 400 },
      );
    }

    await userUpdateInfo(validatedBody.data);

    return NextResponse.json(
      { message: "User info update success" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
