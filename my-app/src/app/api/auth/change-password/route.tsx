import { changePassValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = changePassValidationSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { error: validatedBody.error.message },
        { status: 400 },
      );
    }

    console.log(validatedBody.data);

    NextResponse.json({ message: "Password change success" }, { status: 200 });
  } catch (error) {}
}
