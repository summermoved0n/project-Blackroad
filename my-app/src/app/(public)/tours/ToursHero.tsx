"use client";

import Image from "next/image";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { formatPathname } from "@/lib/utility/helpers";
import { usePathname } from "next/navigation";
import { Text } from "@/components/Text";

export default function ToursHero() {
  const searchPathname = usePathname();

  return (
    <section className="relative w-full h-screen md:h-180 bg-black/30 flex items-center justify-center px-4">
      <div className="absolute rounded-lg top-25 px-5 py-3 backdrop-blur-md flex items-center justify-center gap-2 text-white/60">
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
        src="/images/Travel_with_us.jpg"
        alt="Trees and mountains"
        sizes="100vw"
        fill
      />

      <Text
        as="h2"
        color="white"
        size="lg"
        spacing="sm"
        className="uppercase text-center"
      >
        travel canada with us!
      </Text>
    </section>
  );
}
