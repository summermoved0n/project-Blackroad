"use client";

import { Button } from "@/components/Button";
import SearchForm from "@/components/SearchForm";
import { Text } from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeHero({
  popularTours,
}: {
  popularTours: { id: number; slug: string; title: string }[];
}) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <section className="relative w-full h-screen md:h-180 px-4 xl:px-35 flex flex-col justify-center items-center gap-7.5">
      <Image
        src="/images/Home_hero.jpg"
        alt="Trees and mountains"
        fill
        className="object-cover object-center -z-10"
        sizes="100vw"
        loading="eager"
      />

      <Text
        as="h1"
        color="white"
        size="lg"
        spacing="sm"
        className="w-full text-center md:mb-30"
      >
        INSPIRATION IN EVERY JOURNEY
      </Text>

      <Button
        variant="primary"
        size="sm"
        className="md:hidden"
        onClick={() => router.push("/tours")}
      >
        Book
      </Button>

      <SearchForm
        showModal={showModal}
        setShowModal={setShowModal}
        tours={popularTours}
      />
    </section>
  );
}
