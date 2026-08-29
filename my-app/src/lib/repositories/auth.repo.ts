import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { UserWhereUniqueInput } from "../../../generated/prisma/models";

type dbCreateUserProps = {
  email: string;
  password: string;
  verificationToken: string;
  verificationTokenExpire: Date;
};

type dbUpdateUserProps = {
  filter: UserWhereUniqueInput;
  data: {
    email?: string;
    name?: string | null;
    phoneNumber?: string | null;
    dateOfBirth?: Date | null;
    password?: string;
    isVerify?: boolean;
    verificationToken?: string | null;
    verificationTokenExpire?: Date | null;
    resetPasswordToken?: string | null;
    resetPasswordExpire?: Date | null;
    subscribe?: boolean;
    sessionVersion?: number | { increment: number };
  };
};

type dbFindUserWithToken = {
  verificationToken?: string | null;
  resetPasswordToken?: string | null;
};

export const dbFindUser = async (filter: UserWhereUniqueInput) => {
  return prisma.user.findUnique({
    where: filter,
  });
};

export const dbFindUserByToken = async (token: dbFindUserWithToken) => {
  return prisma.user.findFirst({
    where: token,
  });
};

export const dbGetUser = async (filter: UserWhereUniqueInput) => {
  return prisma.user.findUnique({
    where: filter,
    select: {
      id: true,
      email: true,
      name: true,
      phoneNumber: true,
      dateOfBirth: true,
    },
  });
};

export const dbCreateUser = async (data: dbCreateUserProps) => {
  const hashPassword = await hashNewPassword(data.password);
  return prisma.user.create({ data: { ...data, password: hashPassword } });
};

export const dbUpdateUser = async ({ filter, data }: dbUpdateUserProps) => {
  return prisma.user.update({
    where: filter,
    data,
  });
};

export const dbConsumeVerificationToken = async (verificationToken: string) =>
  prisma.user.updateMany({
    where: {
      verificationToken,
      verificationTokenExpire: { gt: new Date() },
      isVerify: false,
    },
    data: {
      isVerify: true,
      verificationToken: null,
      verificationTokenExpire: null,
    },
  });

export const dbResetPasswordByToken = async ({
  resetPasswordToken,
  password,
}: {
  resetPasswordToken: string;
  password: string;
}) =>
  prisma.user.updateMany({
    where: {
      resetPasswordToken,
      resetPasswordExpire: { gt: new Date() },
    },
    data: {
      password,
      resetPasswordToken: null,
      resetPasswordExpire: null,
      sessionVersion: { increment: 1 },
    },
  });

export const validatePassword = async (
  password: string,
  hashPassword: string,
) => await bcrypt.compare(password, hashPassword);

export const hashNewPassword = async (password: string) =>
  await bcrypt.hash(password, 10);
