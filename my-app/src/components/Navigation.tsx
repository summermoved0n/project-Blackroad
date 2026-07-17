"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Text } from "./Text";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const navList = [
  {
    name: "tours",
    path: "/tours",
    img: "/images/Travel_with_us.jpg",
  },
  {
    name: "hotels",
    path: "/hotels",
    img: "/images/Feel_comfort_left.jpg",
  },
  {
    name: "about us",
    path: "/about_us",
    img: "/images/Who_are_we.jpg",
  },
  {
    name: "faq",
    path: "/faq",
    img: "/images/Popular_tours_lake.jpg",
  },
  {
    name: "contacts",
    path: "/contacts",
    img: "/images/Contacts.jpg",
  },
];

type NavigationProps = {
  setOpenDropMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navigation({ setOpenDropMenu }: NavigationProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(navList[0].img);
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className="grid md:grid-cols-2">
      <div className="flex flex-col gap-10">
        {navList.map(({ name, path, img }) => (
          <button
            key={path}
            className="w-fit group"
            onClick={() => {
              setOpenDropMenu(false);
              router.push(path);
            }}
          >
            <Text
              as="h2"
              color="white"
              size="lg"
              spacing="sm"
              onMouseEnter={() => {
                setActiveImage(img);
                setIsHover(true);
              }}
              onMouseLeave={() => setIsHover(false)}
              className={clsx(
                "uppercase",
                // base
                "md:relative transition md:text-white/20",
                // hover text
                "hover:text-accent md:hover:text-white md:hover:translate-x-20",
                // after element
                "md:hover:after:content-['']",
                "md:hover:after:absolute",
                "md:hover:after:-left-35 md:hover:after:top-1/2",
                "md:hover:after:w-25 md:hover:after:h-0.5",
                "md:hover:after:bg-white md:hover:after:transition-all",
                // focus text
                "group-focus:text-accent md:group-focus:text-white",
              )}
            >
              {name}
            </Text>
          </button>
        ))}
      </div>

      <div
        className={clsx(
          "relative hidden md:block w-full h-137.5",
          !isHover && "bg-black/80",
        )}
      >
        <Image
          src={activeImage}
          alt={""}
          fill
          className={"objecr-cover object-center transition -z-10"}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
