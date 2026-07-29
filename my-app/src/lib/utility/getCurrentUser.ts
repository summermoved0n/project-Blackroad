import { cookies } from "next/headers";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

type TokenPayload = {
  id: number;
  email: string;
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    return id;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return null;
    }

    throw error;
  }
};
