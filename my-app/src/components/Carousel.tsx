"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { Button } from "./Button";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Text } from "./Text";
import { useEffect, useState } from "react";
import { CarouselDotIcon } from "@/components/icons/CarouselDotIcon";
import TourCard from "@/app/(public)/home/TourCard";
import { PopularToursProps } from "@/types/tour.types";

type CarouselProps = {
  componentTitle: string;
  tours: PopularToursProps[];
};

export default function Carousel({ tours, componentTitle }: CarouselProps) {
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

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative px-4 pt-12.5 md:px-20 md:py-25 md:grid md:grid-cols-2 md:items-end bg-primary-white">
      <Text
        as="h2"
        color="black"
        size="lg"
        spacing="sm"
        className="mb-7.5 md:mb-0 md:pb-35 md:w-60 text-center md:text-left uppercase"
      >
        {componentTitle}
      </Text>

      <div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5 touch-pan-y touch-pinch-zoom">
            {tours.map(({ id, title, description, imageUrl, price }) => (
              <TourCard
                key={id}
                id={id}
                carouselClassName="flex-[0_0_100%] xl:flex-[0_0_49%] min-w-0"
                title={title}
                description={description}
                imageUrl={imageUrl}
                price={price}
              />
            ))}
          </div>
        </div>

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

        <div className="hidden md:flex md:absolute md:bottom-25 md:left-20 md:gap-10">
          <Button
            variant="tertiary"
            className="flex items-center justify-center"
            onClick={goToPrev}
          >
            <ArrowLeftIcon />
          </Button>

          <Button
            variant="tertiary"
            className="flex items-center justify-center"
            onClick={goToNext}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
