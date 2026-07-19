import Image from "next/image";
import clsx from "clsx";
import { Text } from "@/components/Text";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import { PopularToursProps } from "@/types/tour.types";

type TourCardProps = {
  tour: PopularToursProps;
  carouselClassName: string;
};

export default function TourCard({ tour, carouselClassName }: TourCardProps) {
  const { slug, imageUrl, title, description, price } = tour;
  return (
    <div
      className={clsx(
        carouselClassName,
        "relative bg-black/30 h-187.5 p-10 flex items-end w-full",
      )}
    >
      <Image
        className="object-cover -z-10 shadow-black/60"
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="eager"
      />
      <div className="flex flex-col gap-7.5">
        <Text as="h3" color="white" size="md">
          {title}
        </Text>
        <Text as="p" color="white60" size="sm">
          {description}
        </Text>

        <div className="flex justify-between">
          <ButtonWithArrow path={`tours/${slug}`} className="text-white">
            Book now
          </ButtonWithArrow>

          <Text as="p" color="white" size="md">
            {price} CA$
          </Text>
        </div>
      </div>
    </div>
  );
}
