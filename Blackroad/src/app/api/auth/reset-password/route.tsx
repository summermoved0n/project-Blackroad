import { userResetPassword } from "@/lib/services/auth.services";
import { resetPasswordApiSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = resetPasswordApiSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    await userResetPassword(validatedBody.data);

    return NextResponse.json(
      { message: "Password reset success" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
