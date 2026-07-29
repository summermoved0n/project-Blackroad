import Header from "./Header";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";

export default async function HeaderServer() {
  const isAuth = await getCurrentUser();

  return <Header isAuth={!!isAuth} />;
}
