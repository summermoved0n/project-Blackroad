"use client";

import clsx from "clsx";
import { EmptyHeartIcon } from "@/components/icons/EmptyHeartIcon";
import Image from "next/image";
import { Text } from "@/components/Text";
import ReviewStars from "@/components/ReviewStars";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import { TourPayload } from "@/types/tour.types";

type ToursListItemProps = {
  itemData: TourPayload;
};

export default function ToursListItem({ itemData }: ToursListItemProps) {
  const { id, category, title, imageUrl, rating, description, price } =
    itemData;

  return (
    <li key={id} id={id.toString()} className="w-full h-fit bg-[#171717]">
      <div className="relative w-full h-100">
        <Text
          as="p"
          color="white"
          size="md"
          className={clsx(
            "absolute px-5 py-3 top-5 left-5 rounded-md z-10",
            category === "Mountains" && "bg-[#213e2b]",
            category === "Lakes" && "bg-[#477292]",
          )}
        >
          {category}
        </Text>
        <button
          type="button"
          className="absolute h-10 w-10 bg-black/40 flex justify-center items-center rounded-full top-5 right-5 z-10"
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
        <Text as="p" color="white" size="md" className="">
          {title}
        </Text>
        <div className="flex justify-between items-center">
          <ReviewStars stars={rating} />
          <Text as="p" color="white" size="sm">
            {rating}
          </Text>
        </div>
        <Text as="p" color="white60" size="sm" className="">
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
