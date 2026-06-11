"use client";

import { Text } from "@/components/Text";
import ReviewsItem from "./ReviewsItem";
import clsx from "clsx";
import { EmblaCarouselType } from "embla-carousel";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselDotIcon } from "@/components/icons/CarouselDotIcon";

type ReviewsProps = {
  isDark?: boolean;
  tourReviews: {
    id: number;
    author: {
      id: number;
      name: string | null;
    };
    rating: number;
    comment: string;
    instagram: string | null;
    tourId: number;
  }[];
};

export default function Reviews({ tourReviews, isDark }: ReviewsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const goTo = (index: number) => emblaApi?.scrollTo(index);
  const setupSnaps = (api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  };
  const setActiveSnap = (api: EmblaCarouselType) =>
    setSelectedSnap(api.selectedScrollSnap());

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setupSnaps(emblaApi);
    setActiveSnap(emblaApi);

    emblaApi.on("reInit", setupSnaps);
    emblaApi.on("reInit", setActiveSnap);
    emblaApi.on("select", setActiveSnap);
  }, [emblaApi]);

  return (
    <section
      className={clsx(
        "flex flex-col items-center pt-12.5 pb-12.5 mx-4 md:pt-25 ",
        isDark ? "md:mx-0  md:pb-25" : "md:mx-20 md:pb-37.5",
      )}
    >
      <Text
        as="h2"
        color={isDark ? "white" : "black"}
        size="lg"
        spacing="sm"
        className={clsx(isDark ? "mb-25" : "mb-20")}
      >
        REVIEWS
      </Text>

      <div className="relative overflow-hidden" ref={emblaRef}>
        <ul className="flex touch-pan-y touch-pinch-zoom cursor-grab">
          {tourReviews.map(({ id, rating, comment, author }) => (
            <ReviewsItem
              key={id}
              stars={rating}
              description={comment}
              author={author.name || "Anonymous"}
              isDark={isDark}
            />
          ))}
        </ul>

        <div className="flex items-center justify-center mt-4 gap-2.5 md:hidden">
          {scrollSnaps.map((_, index) => (
            <button key={index} onClick={() => goTo(index)}>
              {selectedSnap === index ? (
                <CarouselDotIcon color="1" />
              ) : (
                <CarouselDotIcon />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
