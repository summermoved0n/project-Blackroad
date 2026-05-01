import { InstagramIcon } from "@/lib/icons/InstagramIcon";
import ReviewStars from "../components/ReviewStars";
import { Text } from "../components/Text";
import clsx from "clsx";

type ReviewsItemProps = {
  stars: 1 | 2 | 3 | 4 | 5;
  description: string;
  author: string;
  isDark?: boolean;
};

export default function ReviewsItem({
  isDark,
  stars,
  description,
  author,
}: ReviewsItemProps) {
  return (
    <li
      className={clsx(
        "flex flex-col items-center justify-between gap-7.5 md:gap-10 py-12.5 px-5 border border-l-0 border-r-0 md:border-l-1 md:border-r-1  border-[rgba(23,23,23,0.1)]",

        "first:border-b-0 last:border-t-0 md:first:border-b-1 md:last:border-t-1 md:first:border-l-0 md:first:border-r-0 md:last:border-r-0 md:last:border-l-0",

        isDark && "border-white/20",
      )}
    >
      <ReviewStars stars={stars} />
      <Text
        as="p"
        color={isDark ? "white60" : "black60"}
        size="sm"
        className="text-center"
      >
        {description}
      </Text>
      <div className="flex justify-center gap-2.5">
        <Text as="p" color={isDark ? "white" : "black"} size="sm">
          {author}
        </Text>
        <InstagramIcon isWhite />
      </div>
    </li>
  );
}
