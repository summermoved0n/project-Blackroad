import { userVerify } from "@/lib/services/auth.services";
import { NextResponse } from "next/server";
import { verificationTokenSchema } from "@/lib/validations/auth.validation";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedBody = verificationTokenSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    await userVerify(validatedBody.data);

    return NextResponse.json(
      { message: "User verify success" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to verify email") },
      { status: 400 },
    );
  }
}
