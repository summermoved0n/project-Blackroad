import jwt from "jsonwebtoken";

import { logInUser } from "@/lib/services/auth.services";
import { loginValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/utility/rateLimit";
import { serverEnv } from "@/lib/env/server";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "auth:login", {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();
    const validatedBody = loginValidationSchema.safeParse(body);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: validatedBody.error.message },
        { status: 400 },
      );
    }

    const user = await logInUser(validatedBody.data);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        sessionVersion: user.sessionVersion,
      },
      serverEnv.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const response = NextResponse.json(
      { message: "Welcome to your account" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to sign in") },
      { status: 401 },
    );
  }
}
