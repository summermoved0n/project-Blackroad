import { signUpUser } from "@/lib/services/auth.services";
import { signupValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/utility/rateLimit";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "auth:signup", {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (limited) return limited;

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
      { message: "User create success. Please check your email to verify" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to create account") },
      { status: 409 },
    );
  }
}
