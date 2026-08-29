import { userChangePassword } from "@/lib/services/auth.services";
import { changePassValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = changePassValidationSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    await userChangePassword(validatedBody.data);

    const response = NextResponse.json(
      { message: "Password change success" },
      { status: 200 },
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to change password") },
      { status: 400 },
    );
  }
}
