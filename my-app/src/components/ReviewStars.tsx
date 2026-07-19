import { EmptyStarIcon } from "@/components/icons/EmptyStarIcon";
import { FillStarIcon } from "@/components/icons/FillStarIcon";

type ReviewStarsProps = {
  stars: number;
};

export default function ReviewStars({ stars }: ReviewStarsProps) {
  if (stars >= 4.5) {
    return (
      <div className="flex gap-1.5">
        <FillStarIcon />
        <FillStarIcon />
        <FillStarIcon />
        <FillStarIcon />
        <FillStarIcon />
      </div>
    );
  } else if (stars === 4) {
    return (
      <div className="flex gap-1.5">
        <FillStarIcon />
        <FillStarIcon />
        <FillStarIcon />
        <FillStarIcon />
        <EmptyStarIcon />
      </div>
    );
  } else if (stars === 3) {
    return (
      <div className="flex gap-1.5">
        <FillStarIcon />
        <FillStarIcon />
        <FillStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
      </div>
    );
  } else if (stars === 2) {
    return (
      <div className="flex gap-1.5">
        <FillStarIcon />
        <FillStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
      </div>
    );
  } else if (stars === 1) {
    return (
      <div className="flex gap-1.5">
        <FillStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
      </div>
    );
  } else if (stars < 1) {
    return (
      <div className="flex gap-1.5">
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
      </div>
    );
  } else {
    return <div>Something went wrong</div>;
  }
}
