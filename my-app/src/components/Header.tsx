"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Logo from "./Logo";
import { MenuBurgerIcon } from "@/components/icons/MenuBurgerIcon";
import { CrossIcon } from "@/components/icons/CrossIcon";
import Navigation from "./Navigation";

type HeaderProps = {
  isAuth: boolean;
};

export default function Header({ isAuth }: HeaderProps) {
  const router = useRouter();
  const [openDropMenu, setOpenDropMenu] = useState<boolean>(false);
  const [] = useState<boolean>(false);

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
        "text-white border-b border-white/10 h-17 sm:h-20 w-full px-4  md:px-0 transition flex items-center justify-between absolute top-0 left-0 z-50",
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
      <div className="md:h-full w-30 md:w-50 md:flex md:items-center md:justify-center">
        {!openDropMenu ? (
          <button
            className="md:h-10 md:w-10flex items-center justify-center transition text-white hover:text-accent focus:text-accent"
            type="button"
            onClick={() => setOpenDropMenu(true)}
          >
            <MenuBurgerIcon />
          </button>
        ) : (
          <button
            className="md:h-10 md:w-10 flex items-center justify-center transition text-white hover:text-accent focus:text-accent"
            type="button"
            onClick={() => setOpenDropMenu(false)}
          >
            <CrossIcon />
          </button>
        )}
      </div>
      <button
        type="button"
        className="hidden md:h-full md:w-30 md:flex md:items-center md:justify-center transition hover:text-accent focus:text-accent"
      >
        Fr / En
      </button>
      <Logo onClose={setOpenDropMenu} />
      {isAuth ? (
        <button
          className="hover:text-accent md:h-full w-30 md:flex md:items-center md:justify-center transition focus:text-accent"
          onClick={() => router.push("/profile")}
        >
          My Profile
        </button>
      ) : (
        <button
          className="hover:text-accent transition md:h-full w-30 md:flex md:items-center md:justify-center"
          onClick={() => router.push("/login")}
        >
          Log in
        </button>
      )}
      <button
        type="button"
        className="hidden md:flex border-l border-white/10 h-full md:w-50 justify-center items-center transition hover:text-accent focus:text-accent"
        onClick={() => router.push("/build-trip")}
      >
        Build trip
      </button>
    </header>
  );
}
