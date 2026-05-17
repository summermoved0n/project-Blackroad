import bcrypt from "bcrypt";
import { prisma } from "../prisma";

type dbCreateUserProps = {
  email: string;
  password: string;
  verificationToken: string;
};

type dbUpdateUserProps = {
  filter: { email: string };
  data: { name?: string; password?: string };
};

export const dbFindUser = async ({ filter }: { filter: string }) => {
  return prisma.user.findUnique({
    where: {
      email: filter,
    },
  });
};

export const dbCreateUser = async (data: dbCreateUserProps) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({ data: { ...data, password: hashPassword } });
};

export const dbUpdateUser = async ({ filter, data }: dbUpdateUserProps) => {
  return prisma.user.update({
    where: filter,
    data,
  });
};

export const validatePassword = (password: string, hashPassword: string) =>
  bcrypt.compare(password, hashPassword);
