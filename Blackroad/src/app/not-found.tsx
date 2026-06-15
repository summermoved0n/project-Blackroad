"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="bg-primary pt-17 md:pt-20">
      <div className="bg-secondary py-70 flex flex-col justify-center items-center gap-20">
        <div className="relative w-175 h-75">
          <Image
            src="/images/404.png"
            alt="404"
            fill
            loading="eager"
            className="bg-transparent"
          />
        </div>
        <Text as="h1" color="white" size="lg" className="uppercase">
          Page not found
        </Text>

        <Button variant="primary" size="sm" onClick={() => router.replace("/")}>
          Main
        </Button>
      </div>
    </main>
  );
}
