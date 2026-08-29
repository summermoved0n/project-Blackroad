import { userUpdateInfo } from "@/lib/services/auth.services";
import { editUserInfoSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

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

    const emailChanged = await userUpdateInfo(validatedBody.data);

    const response = NextResponse.json(
      { message: "User info update success" },
      { status: 200 },
    );
    if (emailChanged) response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to update profile") },
      { status: 400 },
    );
  }
}
