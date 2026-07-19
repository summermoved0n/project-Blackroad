'use client";';

// import { Button } from "@/components/Button";
import ReviewStars from "@/components/ReviewStars";
import { Text } from "@/components/Text";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { EmptyHeartIcon } from "@/components/icons/EmptyHeartIcon";
import { handleApiError } from "@/lib/utility/handleApiError";
import { calculateNights, capitalizeFirstLetter } from "@/lib/utility/helpers";
import { TourPayload, TourReviewsPayload } from "@/types/tour.types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type TourInfoProps = {
  tourData: TourPayload;
  tourReviews: TourReviewsPayload[];
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function TourInfo({
  tourData,
  tourReviews,
  favoriteToursList,
}: TourInfoProps) {
  const router = useRouter();
  const { id, route, category, title, imageUrl, price, food, departures } =
    tourData;

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

  const averageRating =
    tourReviews.length > 0
      ? Number(
          (
            tourReviews.reduce((sum, review) => sum + review.rating, 0) /
            tourReviews.length
          ).toFixed(1),
        )
      : 0;

  return (
    <section className="flex flex-col items-center justify-center pb-12.5 md:pb-25">
      <div className="py-3 px-5 bg-primary rounded-lg flex w-fit justify-center items-center gap-2 mb-7.5 md:mb-12.5 text-white/60">
        <Text as="p" color="white60" size="xs">
          Main
        </Text>
        <ChevronRightIcon pageLinkChevron />
        <Text as="p" color="white60" size="xs" className="text-center">
          Choose a tour
        </Text>
        <ChevronRightIcon pageLinkChevron />

        <Text as="h1" color="white60" size="xs" className="text-center">
          {title}
        </Text>
      </div>

      <div className="flex justify-between w-full mb-10 gap-10">
        <Text as="h2" color="white" size="lg" className="uppercase">
          {title}
        </Text>

        {favoriteTour ? (
          <button
            type="button"
            className="w-16 md:w-53.5 h-12 bg-primary rounded-md text-white flex justify-center items-center gap-5 hover:text-accent focus:text-accent transition"
            onClick={() => onRemoveFromFavoriteClick(favoriteTour.id)}
          >
            <span className="hidden md:block">Add to Favorites</span>
            <EmptyHeartIcon active />
          </button>
        ) : (
          <button
            type="button"
            className="w-16 md:w-53.5 h-12 bg-primary rounded-md text-white flex justify-center items-center gap-5 hover:text-accent focus:text-accent transition"
            onClick={() => onAddToFavoriteClick(id!)}
          >
            <span className="hidden md:block">Add to Favorites</span>
            <EmptyHeartIcon />
          </button>
        )}
      </div>

      <div className="w-full md:h-163 grid md:grid-cols-[2fr_1fr] md:gap-10 lg:gap-35">
        <div className="relative h-75 md:h-full mb-7.5 md:mb-0">
          <Image
            className="object-cover object-center"
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-between">
          <Text as="h3" color="white" size="md" className="mb-10 md:mb-0">
            Tour Information
          </Text>

          <div className="mb-10 md:mb-0 flex items-center justify-between">
            <ReviewStars stars={averageRating} />
            <Text as="h3" color="white" size="md" className="md:hidden">
              {averageRating}
            </Text>
          </div>

          <div className="md:w-75 flex flex-col gap-10 mb-10 md:mb-0">
            <div className="flex flex-col gap-4">
              <Text as="h4" color="white60" size="sm">
                Route:
              </Text>
              <Text as="p" color="white" size="sm">
                {route.join(" - ")}
              </Text>
            </div>

            <div className="flex justify-between items-center">
              <Text as="h4" color="white60" size="sm">
                Tour dates:
              </Text>
              <Text as="p" color="white" size="sm">
                {departures.map(
                  (item) =>
                    `${item.startDate.toISOString().slice(5, 10).replace("-", ".")} `,
                )}
              </Text>
            </div>

            <div className="flex justify-between items-center">
              <Text as="h4" color="white60" size="sm">
                Duration:
              </Text>
              <Text as="p" color="white" size="sm">
                {calculateNights(
                  departures[0].startDate,
                  departures[0].endDate,
                )}{" "}
                days
              </Text>
            </div>

            <div className="flex justify-between items-center">
              <Text as="h4" color="white60" size="sm">
                Food:
              </Text>
              <Text as="p" color="white" size="sm">
                {food || "Not included"}
              </Text>
            </div>

            <div className="flex justify-between items-center">
              <Text as="h4" color="white60" size="sm">
                Category:
              </Text>
              <Text as="p" color="white" size="sm">
                {capitalizeFirstLetter(category)}
              </Text>
            </div>
          </div>

          <div className="pt-11 border-t border-t-white/10 flex justify-between items-center">
            <Text as="p" color="white" size="sm">
              Price for 1 person
            </Text>
            <Text as="p" color="white" size="md">
              {price} CA$
            </Text>
          </div>

          {/* <Button
            onClick={() => router.push(`${slug}/booking`)}
            variant="primary"
          >
            Book now
          </Button> */}
        </div>
      </div>
    </section>
  );
}
