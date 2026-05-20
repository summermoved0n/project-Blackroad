import "dotenv/config";
import { nanoid } from "nanoid";
import {
  dbCreateUser,
  dbFindUser,
  dbUpdateUser,
  hashNewPassword,
  validatePassword,
} from "../repositories/auth.repo";
import { resend } from "../resend";
import { getCurrentUser } from "../utility/getCurrentUser";

const { RESEND_EMAIL_FROM, BASE_URL } = process.env;

type SignUpUserProps = {
  email: string;
  password: string;
};

type LogInUserProps = {
  email: string;
  password: string;
};

type ChangePassProps = {
  password: string;
  newPassword: string;
};

type VerificationTokenProps = {
  verificationToken: string;
};

export const signUpUser = async ({ email, password }: SignUpUserProps) => {
  const existedUser = await dbFindUser({ email });

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
  const existedUser = await dbFindUser({ email });

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

  return existedUser;
};

export const userVerify = async ({
  verificationToken,
}: VerificationTokenProps) => {
  const user = await dbFindUser({ verificationToken });

  if (!user) {
    throw new Error("User not found");
  }

  await dbUpdateUser({
    filter: { id: user.id },
    data: { isVerify: true, verificationToken: "" },
  });
};

export const userChangePassword = async ({
  password,
  newPassword,
}: ChangePassProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("User not found");
  }

  const comparePassword = await validatePassword(
    password,
    currentUser.password,
  );

  if (!comparePassword) {
    throw new Error("Email or password not valid");
  }

  const createNewPassword = await hashNewPassword(newPassword);

  await dbUpdateUser({
    filter: { id: currentUser.id },
    data: { password: createNewPassword },
  });
};

export const userForgotPassword = async ({ email }: { email: string }) => {
  const existedUser = await dbFindUser({ email });

  if (!existedUser) {
    throw new Error("User not found");
  }

  if (existedUser!.resetPasswordExpire! > new Date()) {
    throw new Error("Token was sent and still active");
  }

  const resetToken = nanoid(25);

  await dbUpdateUser({
    filter: { id: existedUser.id },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpire: new Date(Date.now() + 1000 * 60 * 15),
    },
  });

  await resend.emails.send({
    from: RESEND_EMAIL_FROM!,
    to: email,
    subject: "Reset password for Blackroad",
    html: `<a href="${BASE_URL}/reset-password/${resetToken}" target="_blank">Click to reset password</a>`,
  });
};
