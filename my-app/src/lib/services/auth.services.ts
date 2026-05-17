import "dotenv/config";
import { nanoid } from "nanoid";
import {
  dbCreateUser,
  dbFindUser,
  validatePassword,
} from "../repositories/auth.repo";
import { resend } from "../resend";

const { RESEND_EMAIL_FROM, BASE_URL } = process.env;

type SignUpUserProps = {
  email: string;
  password: string;
};

type LogInUserProps = {
  email: string;
  password: string;
};

export const signUpUser = async ({ email, password }: SignUpUserProps) => {
  const existedUser = await dbFindUser({ filter: email });

  if (existedUser) {
    throw new Error("Email in use");
  }

  const verificationToken = nanoid();

  await dbCreateUser({ email, password, verificationToken });

  await resend.emails.send({
    from: RESEND_EMAIL_FROM!,
    to: email,
    subject: "Verify email for Blackroad",
    html: `<a href="${BASE_URL}/verify/${verificationToken}" target="_blank">Click to verify</a>`,
  });
};

export const logInUser = async ({ email, password }: LogInUserProps) => {
  const existedUser = await dbFindUser({ filter: email });

  if (!existedUser) {
    throw new Error("Email or password not valid");
  }

  if (!existedUser.isVerify) {
    throw new Error("Email is not verify");
  }

  const comparePassword = await validatePassword(
    password,
    existedUser.password,
  );

  if (!comparePassword) {
    throw new Error("Email or password not valid");
  }
};
