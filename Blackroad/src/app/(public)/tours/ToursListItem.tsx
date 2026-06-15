"use client";

import clsx from "clsx";
import { EmptyHeartIcon } from "@/components/icons/EmptyHeartIcon";
import Image from "next/image";
import { Text } from "@/components/Text";
import ReviewStars from "@/components/ReviewStars";
import ButtonWithArrow from "@/components/ButtonWithArrow";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ToursListItemProps = {
  itemData: {
    id: number;
    category: string;
    title: string;
    imageUrl: string;
    rating: number;
    description: string;
    price: number;
  };
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function ToursListItem({
  itemData,
  favoriteToursList,
}: ToursListItemProps) {
  const router = useRouter();

  const { id, category, title, imageUrl, rating, description, price } =
    itemData;
  const favoriteTour = favoriteToursList?.find((item) => item.tourId === id);

  const onAddToFavoriteClick = async (tourId: number) => {
    try {
      const response = await axios.post("/api/profile/favorites", { tourId });
      toast.success(response.data.message);
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

  const onRemoveFromFavoriteClick = async (favoriteId: number) => {
    try {
      const response = await axios.delete(
        `/api/profile/favorites/${favoriteId}`,
      );
      toast.success(response.data.message);
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

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
        {!favoriteTour ? (
          <button
            type="button"
            className="absolute h-10 w-10 bg-black/40 flex justify-center items-center rounded-full top-5 right-5 z-10 pt-1"
            onClick={() => onAddToFavoriteClick(id)}
          >
            <EmptyHeartIcon />
          </button>
        ) : (
          <button
            type="button"
            className="absolute h-10 w-10 bg-black/40 flex justify-center items-center rounded-full top-5 right-5 z-10 pt-1"
            onClick={() => onRemoveFromFavoriteClick(favoriteTour.id)}
          >
            <EmptyHeartIcon active />
          </button>
        )}
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
