import { NextResponse } from "next/server";
import { dbCreateUser, dbFindUser } from "../repositories/auth.repo";

type SignUpUserProps = {
  email: string;
  password: string;
};

export const signUpUser = async ({ email, password }: SignUpUserProps) => {
  try {
    const existedUser = await dbFindUser({ filter: email });

    if (existedUser) {
      NextResponse.json({ message: "Email in use" }, { status: 409 });
    }

    await dbCreateUser({ email, password });
  } catch (error) {}
};
