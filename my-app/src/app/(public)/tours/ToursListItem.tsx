"use client";

import clsx from "clsx";
import { EmptyHeartIcon } from "@/components/icons/EmptyHeartIcon";
import Image from "next/image";
import { Text } from "@/components/Text";
import ReviewStars from "@/components/ReviewStars";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import { TourPayload } from "@/types/tour.types";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";

type ToursListItemProps = {
  itemData: TourPayload;
};

export default function ToursListItem({ itemData }: ToursListItemProps) {
  const { id, category, title, imageUrl, rating, description, price } =
    itemData;

  return (
    <li
      className="w-full h-fit bg-primary
"
    >
      <div className="relative w-full h-100">
        <Text
          as="p"
          color="white"
          size="md"
          className={clsx(
            "absolute px-5 py-3 top-5 left-5 rounded-md z-10",
            category === "mountains" && "bg-[#213e2b]",
            category === "lakes" && "bg-[#477292]",
          )}
        >
          {capitalizeFirstLetter(category)}
        </Text>
        <button
          type="button"
          className="absolute h-10 w-10 bg-black/40 flex justify-center items-center rounded-full top-5 right-5 z-10 pt-1"
        >
          <EmptyHeartIcon />
        </button>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          sizes="33vw"
        />
      </div>
      <div className="px-5 py-5 flex flex-col gap-7.5">
        <Text as="p" color="white" size="md" className="h-16.5 line-clamp-2">
          {title}
        </Text>
        <div className="flex justify-between items-center">
          <ReviewStars stars={rating} />
          <Text as="p" color="white" size="sm">
            {rating}
          </Text>
        </div>
        <Text as="p" color="white60" size="sm" className="h-25 line-clamp-4">
          {description}
        </Text>
        <div className="flex justify-between items-center">
          <ButtonWithArrow
            path={`/tours/${id}`}
            className="text-white"
            whiteCircle
            whiteArrow
          >
            Book now
          </ButtonWithArrow>
          <Text as="p" color="white" size="md">
            {price} CA$
          </Text>
        </div>
      </div>
    </li>
  );
}
