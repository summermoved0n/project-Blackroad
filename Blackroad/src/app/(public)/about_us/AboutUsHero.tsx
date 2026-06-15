"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { formatPathname } from "@/lib/utility/helpers";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { Text } from "@/components/Text";

export default function AboutUsHero() {
  const searchPathname = usePathname();

  return (
    <section className="relative w-full h-screen bg-black/30 flex items-center justify-center px-4">
      <div className="absolute rounded-lg top-25 px-5 py-3 backdrop-blur-md flex items-center justify-center gap-2">
        <Text as="p" color="white60" size="xs">
          Main
        </Text>
        <ChevronRightIcon pageLinkChevron />
        <Text as="p" color="white60" size="xs">
          {formatPathname(searchPathname)}
        </Text>
      </div>

      <Image
        className="obhect-cover object-center -z-10"
        src="/images/Who_are_we.jpg"
        alt="Trees and mountains"
        sizes="100vw"
        fill
      />

      <div className="flex flex-col items-center gap-7.5">
        <Text
          as="h2"
          color="white"
          size="lg"
          spacing="sm"
          className="uppercase"
        >
          who are we?
        </Text>

        <Text as="p" color="white60" size="sm" className="text-center">
          Blackroad - Canadian tourist operator of inbound, domestic and
          corporate tourism
        </Text>
      </div>
    </section>
  );
}
