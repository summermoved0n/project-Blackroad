import { EmptyStarIcon } from "@/components/icons/EmptyStarIcon";

type ReviewStarsProps = {
  stars: number;
};

export default function ReviewStars({ stars }: ReviewStarsProps) {
  const rating = Math.min(Math.max(stars, 0), 5);
  return (
    <div className="flex gap-1.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        if (rating >= index + 1) {
          return <EmptyStarIcon key={index} fillPercent={100} />;
        }

        if (rating >= index + 0.5) {
          return <EmptyStarIcon key={index} fillPercent={50} />;
        }

        return <EmptyStarIcon key={index} fillPercent={0} />;
      })}
    </div>
  );
}
