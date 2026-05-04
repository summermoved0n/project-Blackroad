import { Text } from "@/app/components/Text";
import { AnimalsIcon } from "@/lib/icons/AnimalsIcon";
import { HouseIcon } from "@/lib/icons/HouseIcon";
import { MountainIcon } from "@/lib/icons/MountainIcon";
import { NatureIcon } from "@/lib/icons/NatureIcon";

export default function TourAdvantages() {
  return (
    <section className="py-12.5 md:py-25">
      <Text
        as="h2"
        color="white"
        size="lg"
        spacing="sm"
        className="text-center mb-10 md:mb-25"
      >
        Advantages of the tour
      </Text>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-12.5">
        <div className="flex flex-col items-center justify-start gap-4">
          <div className="w-12.5 h-12.5 flex items-center justify-center">
            <MountainIcon />
          </div>
          <Text as="h3" color="white" size="md" className="text-center">
            Panoramic views
          </Text>
          <Text as="p" color="white60" size="sm" className="text-center">
            Panoramic views from the top of the mountain and the unique beauty
            of rock formations
          </Text>
        </div>

        <div className="flex flex-col items-center justify-start gap-4">
          <div className="w-12.5 h-12.5 flex items-center justify-center">
            <HouseIcon />
          </div>
          <Text as="h3" color="white" size="md" className="text-center">
            Private cottage
          </Text>
          <Text as="p" color="white60" size="sm" className="text-center">
            Rest in a mountain hotel complex and meeting dawn in the mountains
          </Text>
        </div>

        <div className="flex flex-col items-center justify-start gap-4">
          <div className="w-12.5 h-12.5 flex items-center justify-center">
            <AnimalsIcon />
          </div>
          <Text as="h3" color="white" size="md" className="text-center">
            Visiting animals
          </Text>
          <Text as="p" color="white60" size="sm" className="text-center">
            Walking in the crowns of trees and watching bears
          </Text>
        </div>

        <div className="flex flex-col items-center justify-start gap-4">
          <div className="w-12.5 h-12.5 flex items-center justify-center">
            <NatureIcon />
          </div>
          <Text as="h3" color="white" size="md" className="text-center">
            Picturesque nature
          </Text>
          <Text as="p" color="white60" size="sm" className="text-center">
            Walk along the Carpathian trails to very beautiful locations
          </Text>
        </div>
      </div>
    </section>
  );
}
