import { cookies } from "next/headers";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { prisma } from "../prisma";
import { serverEnv } from "../env/server";

type TokenPayload = {
  id: number;
  email: string;
  sessionVersion: number;
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const { id, sessionVersion } = jwt.verify(
      token,
      serverEnv.JWT_SECRET,
    ) as TokenPayload;

    if (!Number.isInteger(id) || !Number.isInteger(sessionVersion)) return null;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { sessionVersion: true },
    });

    return user?.sessionVersion === sessionVersion ? id : null;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return null;
    }

    throw error;
  }
};
