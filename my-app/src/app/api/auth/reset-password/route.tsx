import { userResetPassword } from "@/lib/services/auth.services";
import { resetPasswordApiSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/utility/rateLimit";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "auth:reset-password", {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

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

    const response = NextResponse.json(
      { message: "Password reset success" },
      { status: 200 },
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to reset password") },
      { status: 400 },
    );
  }
}
