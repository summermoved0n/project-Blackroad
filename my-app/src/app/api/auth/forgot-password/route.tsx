import { userForgotPassword } from "@/lib/services/auth.services";
import { forgotPassValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/utility/rateLimit";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "auth:forgot-password", {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();

    const validatedBody = forgotPassValidationSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    await userForgotPassword(validatedBody.data);

    return NextResponse.json(
      {
        message:
          "If an account with this email exists, we've sent password reset instructions.",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message:
            "If an account with this email exists, we've sent password reset instructions.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
