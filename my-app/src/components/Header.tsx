"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Logo from "./Logo";
import { MenuBurgerIcon } from "@/components/icons/MenuBurgerIcon";
import { CrossIcon } from "@/components/icons/CrossIcon";
import Navigation from "./Navigation";
import { UserIcon } from "./icons";

type HeaderProps = {
  isAuth: boolean;
};

export default function Header({ isAuth }: HeaderProps) {
  const router = useRouter();
  const [openDropMenu, setOpenDropMenu] = useState<boolean>(false);

  useEffect(() => {
    if (openDropMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDropMenu]);

  return (
    <header
      className={clsx(
        "text-white border-b border-white/10 h-17 sm:h-20 w-full px-4 md:px-0 transition grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[200px_auto_auto_auto_200px] items-center justify-between absolute top-0 left-0 z-50",
        openDropMenu
          ? "bg-primary transition backdrop-blur-none"
          : " backdrop-blur-md",
      )}
    >
      <div
        className={clsx(
          "absolute bg-secondary top-17 sm:top-20 left-0 w-full h-screen transform -translate-x-full transition z-50 px-4 md:px-20 pt-7.5 md:pt-15",
          openDropMenu && "translate-x-0 transition",
        )}
      >
        <Navigation setOpenDropMenu={setOpenDropMenu} />
      </div>
      <div className="h-full">
        {!openDropMenu ? (
          <button
            className="h-full w-fit md:ml-20 flex items-center justify-start transition text-white hover:text-accent focus:text-accent"
            type="button"
            onClick={() => setOpenDropMenu(true)}
          >
            <MenuBurgerIcon />
          </button>
        ) : (
          <button
            className="h-full w-fit md:ml-20 flex items-center justify-start transition text-white hover:text-accent focus:text-accent"
            type="button"
            onClick={() => setOpenDropMenu(false)}
          >
            <CrossIcon />
          </button>
        )}
      </div>
      <button
        type="button"
        className="hidden md:h-full md:flex md:items-center md:justify-center transition hover:text-accent focus:text-accent"
      >
        Fr / En
      </button>
      <div className="h-full flex items-center justify-center">
        <Logo onClose={setOpenDropMenu} />
      </div>
      <div className="h-full flex items-center justify-end md:justify-center">
        {isAuth ? (
          <button
            className="h-full w-fit px-2 md:px-0 transition text-white  hover:text-accent focus:text-accent"
            onClick={() => router.push("/profile")}
          >
            <span className="hidden md:block">My Profile</span>
            <span className="md:hidden">
              <UserIcon />
            </span>
          </button>
        ) : (
          <button
            className="transition h-full w-fit md:flex md:items-center md:justify-center hover:text-accent"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
        )}
      </div>
      <button
        type="button"
        className="hidden md:flex border-l border-white/10 h-full w-full justify-center items-center transition hover:text-accent focus:text-accent"
        onClick={() => router.push("/build-trip")}
      >
        Build trip
      </button>
    </header>
  );
}
