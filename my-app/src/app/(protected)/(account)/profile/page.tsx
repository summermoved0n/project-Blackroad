import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";

export default async function page() {
  const user = await getCurrentUser();
  console.log(user);

  return (
    <section className="text-white flex flex-col gap-10">
      <ProfileInfo user={user} />
      <ChangePassword />
    </section>
  );
}
