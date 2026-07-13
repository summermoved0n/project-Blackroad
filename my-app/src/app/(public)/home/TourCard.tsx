import Image from "next/image";
import clsx from "clsx";
import { Text } from "@/components/Text";
import ButtonWithArrow from "@/components/ButtonWithArrow";

type TourCardProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  carouselClassName: string;
};

export default function TourCard({
  id,
  title,
  description,
  imageUrl,
  price,
  carouselClassName,
}: TourCardProps) {
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
          <ButtonWithArrow path={`tours/${id}`} className="text-white">
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
