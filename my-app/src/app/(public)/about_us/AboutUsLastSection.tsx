import Image from "next/image";
import { Text } from "@/components/Text";

export default function AboutUsLastSection() {
  return (
    <section className="grid md:grid-cols-2 gap-7.5 md:gap-35">
      <div className="flex flex-col gap-7.5 md:gap-0 justify-between">
        <Text as="p" color="black60" size="sm">
          Our team is professionals with many years of expertise in
          international tourism, hospitality industry, events, marketing and
          communications. We have visited more than 50 countries of the world
          and are absolutely sure that Canada is one of the most beautiful and
          comfortable for rest. Therefore, today we use all our experience to
          create the best travel in Canada.
        </Text>

        <div className="hidden md:block relative w-full h-95">
          <div className="absolute bg-primary-white h-97 w-7.5 -top-1 left-1/2 transform -translate-x-1/2 z-1"></div>
          <Image
            className="object-cover object-bottom"
            src="/images/We_change_bottom_left.jpg"
            alt="Forest"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
        </div>
      </div>

      <div className="relative w-full h-191">
        <Image
          className="object-cover object-center"
          src="/images/We_change_bottom_right.jpg"
          alt="Forest"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
      </div>
    </section>
  );
}
