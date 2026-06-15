import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type TokenPayload = {
  id: number;
  email: string;
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const { id } = jwt.verify(token!, process.env.JWT_SECRET!) as TokenPayload;

  return id;
};
