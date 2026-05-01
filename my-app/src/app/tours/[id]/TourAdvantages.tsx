import { Text } from "@/app/components/Text";
import { AnimalsIcon } from "@/lib/icons/AnimalsIcon";
import { HouseIcon } from "@/lib/icons/HouseIcon";
import { MountainIcon } from "@/lib/icons/MountainIcon";
import { NatureIcon } from "@/lib/icons/NatureIcon";

export default function TourAdvantages() {
  return (
    <section className="py-25">
      <Text
        as="h2"
        color="white"
        size="lg"
        spacing="sm"
        className="text-center mb-25"
      >
        Advantages of the tour
      </Text>

      <div className="grid items-center grid-cols-4 grid-rows-3 gap-x-7.5h-fit">
        <div className="flex justify-center h-fit">
          <MountainIcon />
        </div>
        <div className="flex justify-center">
          <HouseIcon />
        </div>
        <div className="flex justify-center">
          <AnimalsIcon />
        </div>
        <div className="flex justify-center">
          <NatureIcon />
        </div>

        <Text as="h3" color="white" size="md" className="text-center">
          Panoramic views
        </Text>
        <Text as="h3" color="white" size="md" className="text-center">
          Private cottage
        </Text>
        <Text as="h3" color="white" size="md" className="text-center">
          Visiting animals
        </Text>
        <Text as="h3" color="white" size="md" className="text-center">
          Picturesque nature
        </Text>

        <Text as="p" color="white60" size="sm" className="text-center">
          Panoramic views from the top of the mountain and the unique beauty of
          rock formations
        </Text>
        <Text as="p" color="white60" size="sm" className="text-center">
          Rest in a mountain hotel complex and meeting dawn in the mountains
        </Text>
        <Text as="p" color="white60" size="sm" className="text-center">
          Walking in the crowns of trees and watching bears
        </Text>
        <Text as="p" color="white60" size="sm" className="text-center">
          Walk along the Carpathian trails to very beautiful locations
        </Text>
      </div>
    </section>
  );
}
