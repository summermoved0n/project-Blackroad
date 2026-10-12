import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";
import { dbGetUser } from "@/lib/repositories/auth.repo";

export default async function page() {
  const userId = await getCurrentUser();
  const user = await dbGetUser({ id: userId! });

  return (
    <section className="text-white flex flex-col gap-10">
      <ProfileInfo user={user!} />
      <ChangePassword />
    </section>
  );
}
