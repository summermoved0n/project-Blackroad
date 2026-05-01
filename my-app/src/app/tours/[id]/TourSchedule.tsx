import { Button } from "@/app/components/Button";
import { Text } from "@/app/components/Text";
import { ArrowRightIcon } from "@/lib/icons/ArrowRightIcon";
import Image from "next/image";

export default function TourSchedule() {
  return (
    <section className="py-25">
      <Text as="h2" color="white" size="lg" spacing="sm" className="mb-10">
        Day 1
      </Text>

      <div className="grid grid-cols-[3fr_2fr] gap-7.5 items-center">
        <div className="relative h-175 w-full">
          <Image
            className="object-cover object-center z-10"
            src="/images/We_change_big_house.jpg"
            alt="Day 1"
            fill
            sizes="70vw"
          />

          <div className="absolute w-137 p-15 bg-white top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20">
            <Text as="p" color="black" size="md" className="mb-7.5">
              Satanic Forest
            </Text>

            <Button
              variant="tertiary"
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              <ArrowRightIcon />
            </Button>

            <Text as="p" color="black60" size="sm">
              Arrival to the park, where predators live and undergo
              rehabilitation: bears, wolves, foxes. During the tour, experts
              will talk about the behavior of animals, their habits and eating
              habits, tell the secrets of the Satanic forest. While walking
              along the forest bridge, you can see how bear cubs play and adult
              bears rest.
            </Text>
          </div>
        </div>

        <div className="relative h-137">
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
