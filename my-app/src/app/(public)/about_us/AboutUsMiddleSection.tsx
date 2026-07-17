import Image from "next/image";
import { Text } from "@/components/Text";

export default function AboutUsMiddleSection() {
  return (
    <section className="grid md:grid-cols-2 gap-7.5 md:gap-35">
      <div className="relative w-full h-191">
        <Image
          className="object-cover object-center"
          src="/images/We_change_big_house.jpg"
          alt="Forest"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
      </div>

      <div className="flex flex-col gap-7.5 md:gap-0 justify-between">
        <Text as="p" color="black60" size="sm">
          Blackroad is a miracle of Canada, which we are happy to show and open
          for our customers. Ancient castles and temples, unique architectural
          monuments, picturesque forests, parks, rivers, mountains, and just
          atmospheric places.
        </Text>

        <div className="relative w-full h-77">
          <Image
            className="object-cover object-center"
            src="/images/We_change_valley.jpg"
            alt="Forest"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
