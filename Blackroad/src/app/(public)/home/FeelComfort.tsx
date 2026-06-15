import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Text } from "@/components/Text";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import { Button } from "@/components/Button";

export default function FeelComfort() {
  return (
    <section className="mx-4 pt-12.5 pb-35 md:pt-25 md:pb-37.5 md:mx-20">
      <Text
        as="h2"
        color="black"
        size="lg"
        spacing="sm"
        className="text-center mb-20"
      >
        FEEL COMFORT
      </Text>

      <div className="relative grid md:grid-cols-[2fr_1fr] md:gap-7.5 items-center">
        <div className="relative h-58 w-full md:h-175">
          <Image
            src="/images/Feel_comfort_left.jpg"
            alt="Hotel Room"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            loading="eager"
          />

          <div className="absolute bg-white w-75 md:w-88 md:h-63 z-10 bottom-0 right-1/2 md:bottom-1/2 md:right-0 transform translate-x-1/2 translate-y-1/2 py-7.5 px-15 md:px-0 md:py-0 md:pt-20 md:pl-20">
            <Text as="h3" color="black" size="md" className="mb-7.5">
              Hotels
            </Text>
            <ButtonWithArrow path="/tours">See all</ButtonWithArrow>
            <Button
              variant="tertiary"
              className="hidden md:flex absolute items-center justify-center top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10"
            >
              <ArrowRightIcon />
            </Button>
          </div>
        </div>

        <div className="relative h-137.5 hidden md:block">
          <Image
            src="/images/Feel_comfort_right.jpg"
            alt="Hotel Room"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
