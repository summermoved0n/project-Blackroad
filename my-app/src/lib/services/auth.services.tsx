import "dotenv/config";
import { nanoid } from "nanoid";
import {
  dbCreateUser,
  dbConsumeVerificationToken,
  dbFindUser,
  dbUpdateUser,
  dbResetPasswordByToken,
  hashNewPassword,
  validatePassword,
} from "../repositories/auth.repo";
import { resend } from "../resend";
import { getCurrentUser } from "../utility/getCurrentUser";
import { parseBirthDate } from "../utility/helpers";
import VerifyEmail from "@/emails/VerifyEmail";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { serverEnv } from "../env/server";

const { RESEND_EMAIL_FROM, BASE_URL } = serverEnv;

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

type EditUserData = {
  email?: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  isVerify?: boolean;
  verificationToken?: string;
  verificationTokenExpire?: Date;
  sessionVersion?: { increment: number };
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
  const verificationTokenExpire = new Date(Date.now() + 1000 * 60 * 30);

  await dbCreateUser({
    email,
    password,
    verificationToken,
    verificationTokenExpire,
  });

  await resend.emails.send({
    from: RESEND_EMAIL_FROM!,
    to: email,
    subject: "Verify email for Blackroad",
    react: (
      <VerifyEmail
        verificationUrl={`${BASE_URL}/verify/${verificationToken}`}
      />
    ),
  });
};

export const logInUser = async ({ email, password }: LogInUserProps) => {
  const existedUser = await dbFindUser({ email });

  if (!existedUser) {
    throw new Error("Email or password not valid");
  }

  const comparePassword = await validatePassword(
    password,
    existedUser.password,
  );

  if (!comparePassword) {
    throw new Error("Email or password not valid");
  }

  if (!existedUser.isVerify) {
    throw new Error("Email is not verify");
  }

  return existedUser;
};

export const userVerify = async ({
  verificationToken,
}: VerificationTokenProps) => {
  const result = await dbConsumeVerificationToken(verificationToken);

  if (result.count !== 1) throw new Error("Invalid or expired token");
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
    data: {
      password: createNewPassword,
      sessionVersion: { increment: 1 },
    },
  });
};

export const userForgotPassword = async ({ email }: { email: string }) => {
  const existedUser = await dbFindUser({ email });

  if (!existedUser) {
    return;
  }

  if (
    existedUser.resetPasswordExpire &&
    existedUser.resetPasswordExpire > new Date()
  ) {
    return;
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
    react: (
      <ForgotPasswordEmail
        name={existedUser.name}
        resetUrl={`${BASE_URL}/reset-password/${resetToken}`}
      />
    ),
  });
};

export const userResetPassword = async ({
  password,
  resetToken,
}: ResetPassProps) => {
  const hashedPassword = await hashNewPassword(password);

  const result = await dbResetPasswordByToken({
    resetPasswordToken: resetToken,
    password: hashedPassword,
  });

  if (result.count !== 1) throw new Error("Invalid or expired token");
};

export const userUpdateInfo = async ({
  email,
  name,
  phoneNumber,
  dateOfBirth,
}: UserUpdateInfoProps) => {
  const userId = await getCurrentUser();
  const user = await dbFindUser({ id: userId! });

  if (!user) {
    throw new Error("User not found");
  }

  const editData: EditUserData = {};

  let newVerificationToken: string | null = null;

  if (email && email !== user.email) {
    const emailOwner = await dbFindUser({ email });

    if (emailOwner && emailOwner.id !== user.id) {
      throw new Error("Email in use");
    }

    newVerificationToken = nanoid();
    editData.email = email;
    editData.isVerify = false;
    editData.verificationToken = newVerificationToken;
    editData.verificationTokenExpire = new Date(Date.now() + 1000 * 60 * 30);
    editData.sessionVersion = { increment: 1 };
  }
  if (name) {
    editData.name = name;
  }
  if (phoneNumber) {
    editData.phoneNumber = phoneNumber;
  }
  if (dateOfBirth) {
    const parsedDate = parseBirthDate(dateOfBirth);

    if (!parsedDate) {
      throw new Error("Invalid date of birth");
    }

    editData.dateOfBirth = parsedDate;
  }

  await dbUpdateUser({
    filter: { id: user.id },
    data: editData,
  });

  if (newVerificationToken && email) {
    await resend.emails.send({
      from: RESEND_EMAIL_FROM!,
      to: email,
      subject: "Verify your new email for Blackroad",
      react: (
        <VerifyEmail
          verificationUrl={`${BASE_URL}/verify/${newVerificationToken}`}
        />
      ),
    });
  }

  return Boolean(newVerificationToken);
};
