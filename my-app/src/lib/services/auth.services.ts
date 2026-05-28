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

type ResetPassProps = {
  password: string;
  resetToken: string;
};

type UserUpdateInfoProps = {
  email?: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
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
  const userId = await getCurrentUser();
  const existedUser = await dbFindUser({ id: userId! });

  if (!existedUser) {
    throw new Error("User not found");
  }

  const comparePassword = await validatePassword(
    password,
    existedUser.password,
  );

  if (!comparePassword) {
    throw new Error("Email or password not valid");
  }

  const isSamePassword = await validatePassword(
    newPassword,
    existedUser.password,
  );

  if (isSamePassword) {
    throw new Error("New password must be different");
  }

  const createNewPassword = await hashNewPassword(newPassword);

  await dbUpdateUser({
    filter: { id: existedUser.id },
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

export const userResetPassword = async ({
  password,
  resetToken,
}: ResetPassProps) => {
  const user = await dbFindUser({ resetPasswordToken: resetToken });

  if (!user || user.resetPasswordExpire! < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await hashNewPassword(password);

  await dbUpdateUser({
    filter: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpire: null,
    },
  });
};

export const userUpdateInfo = async ({
  // email,
  name,
  phoneNumber,
  dateOfBirth,
}: UserUpdateInfoProps) => {
  const userId = await getCurrentUser();
  const user = await dbFindUser({ id: userId! });

  if (!user) {
    throw new Error("User not found");
  }

  let parsedDate = null;

  if (dateOfBirth) {
    const [month, day, year] = dateOfBirth!.split("/");

    return (parsedDate = new Date(`${year}-${month}-${day}`));
  }

  await dbUpdateUser({
    filter: { id: user.id },
    data: { name, phoneNumber, dateOfBirth: parsedDate },
  });
};
