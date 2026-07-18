"use client";

import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { Text } from "@/components/Text";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AccountHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const onLogOut = async () => {
    try {
      const response = await axios.post("/api/auth/logout");

      router.replace("/");
      router.refresh();

      toast.success(response.data.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <section className="mb-4">
      <div className="m-auto px-4 py-3 bg-primary rounded-md w-fit flex justify-center items-center gap-2 mb-7.5 md:mb-14 text-white/60">
        <Text as="p" color="white60" size="sm">
          Main
        </Text>
        <ChevronRightIcon pageLinkChevron />
        <Text as="p" color="white60" size="sm">
          Profile
        </Text>
      </div>

      <nav className="flex justify-between items-center">
        <div className="text-white/50 flex gap-4 md:gap-10">
          <button
            type="button"
            className={clsx(
              "border border-transparent rounded-md focus:border-white",
              pathname === "/profile" && "text-white",
            )}
            onClick={() => handleNavigate("/profile")}
          >
            My Profile
          </button>
          <button
            type="button"
            className={clsx(
              "border border-transparent rounded-md focus:border-white",
              pathname === "/booking-history" &&
                "text-white focus:outline-accent",
            )}
            onClick={() => handleNavigate("/booking-history")}
          >
            Booking history
          </button>
          <button
            type="button"
            className={clsx(
              "border border-transparent rounded-md focus:border-white",
              pathname === "/favorites" && "text-white focus:outline-accent",
            )}
            onClick={() => handleNavigate("/favorites")}
          >
            Favorites
          </button>
        </div>

        <button
          className="text-white hover:text-accent focus:text-accent"
          type="button"
          onClick={onLogOut}
        >
          Log Out
        </button>
      </nav>
    </section>
  );
}
