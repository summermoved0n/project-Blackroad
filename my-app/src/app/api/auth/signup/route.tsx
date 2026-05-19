import { signUpUser } from "@/lib/services/auth.services";
import { signupValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = signupValidationSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    await signUpUser(validatedBody.data);

    return NextResponse.json(
      { message: "User create success" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
