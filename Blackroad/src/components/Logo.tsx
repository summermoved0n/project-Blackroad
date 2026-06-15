"use client";

import { Italiana } from "next/font/google";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

type LogoProps = {
  onClose?: Dispatch<SetStateAction<boolean>>;
};

export default function Logo({ onClose }: LogoProps) {
  return (
    <Link
      onClick={() => onClose && onClose(false)}
      href="/"
      className={`text-2xl sm:text-5xl ${italiana.className}`}
    >
      BLACKROAD
    </Link>
  );
}
