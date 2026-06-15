import { Button } from "@/components/Button";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import { Text } from "@/components/Text";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import Image from "next/image";

export default function TourSchedule() {
  return (
    <section className="py-12.5 md:py-25">
      <Text
        as="h2"
        color="white"
        size="lg"
        spacing="sm"
        className="mb-7.5 md:mb-10"
      >
        Day 1
      </Text>

      <div className="grid md:grid-cols-[3fr_2fr] gap-7.5 items-center">
        <div className="relative h-62.5 md:h-175 w-full mb-20 md:mb-0">
          <Image
            className="object-cover object-center z-10"
            src="/images/We_change_big_house.jpg"
            alt="Day 1"
            fill
            sizes="70vw"
          />

          <div className="absolute w-[90%] md:w-137 p-7.5 md:p-15 bg-white top-1/2 right-[5%] translate-y-1/2 md:top-1/2 md:right-0 md:translate-x-1/2 md:-translate-y-1/2 z-20">
            <Text as="p" color="black" size="md" className="mb-4 md:mb-7.5">
              Satanic Forest
            </Text>

            <Button
              variant="tertiary"
              className="hidden md:flex absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <ArrowRightIcon />
            </Button>

            <ButtonWithArrow className="md:hidden">More</ButtonWithArrow>

            <Text as="p" color="black60" size="sm" className="hidden md:block">
              Arrival to the park, where predators live and undergo
              rehabilitation: bears, wolves, foxes. During the tour, experts
              will talk about the behavior of animals, their habits and eating
              habits, tell the secrets of the Satanic forest. While walking
              along the forest bridge, you can see how bear cubs play and adult
              bears rest.
            </Text>
          </div>
        </div>

        <div className="hidden md:block relative h-137">
          <Image
            className="object-cover object-center"
            src="/images/We_change_left.jpg"
            alt="Day 1"
            fill
            sizes="30vw"
          />
        </div>
      </div>
    </section>
  );
}
