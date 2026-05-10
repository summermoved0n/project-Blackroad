import { prisma } from "@/lib/prisma";
import { signupValidationSchema } from "@/lib/validations/auth.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = signupValidationSchema.safeParse(body);

    console.log(validatedBody);

    // const { email, password } = body;

    // const newUser = await prisma.user.create({
    //   data: {
    //     email,
    //     password,
    //   },
    // });

    // return NextResponse.json(newUser);
  } catch (error) {}
}
