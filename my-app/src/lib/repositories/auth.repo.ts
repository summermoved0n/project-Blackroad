import { prisma } from "../prisma";

type dbCreateUserProps = { email: string; password: string };

export const dbFindUser = async ({ filter }: { filter: string }) => {
  return prisma.user.findUnique({
    where: {
      email: filter,
    },
  });
};

export const dbCreateUser = async (data: dbCreateUserProps) => {
  return prisma.user.create({ data: data });
};
