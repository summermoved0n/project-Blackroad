import { cookies } from "next/headers";
import Header from "./Header";

export default async function HeaderServer() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  return <Header isAuth={!!token} />;
}
