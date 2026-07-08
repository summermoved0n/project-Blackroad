import ReviewStars from "@/components/ReviewStars";
import { Text } from "@/components/Text";
import { UserIcon } from "@/components/icons";
import clsx from "clsx";

type ReviewsItemProps = {
  stars: number;
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
        "flex min-h-55 flex-[0_0_100%] flex-col items-center justify-between px-6 py-7.5 md:min-h-55 md:flex-[0_0_33.333333%] md:px-7.5",
        "border-y border-r last:border-r-0",
        isDark ? "border-white/20" : "border-black/10",
      )}
    >
      <ReviewStars stars={stars} />
      <Text
        as="p"
        color={isDark ? "white60" : "black60"}
        size="sm"
        className="max-w-72 text-center text-sm leading-4.5 md:max-w-75 md:text-[15px] md:leading-5 line-clamp-4 select-none"
      >
        {description}
      </Text>
      <div className="flex justify-center items-center gap-2.5">
        <Text
          as="p"
          color={isDark ? "white" : "black"}
          size="sm"
          className="text-sm leading-none select-none"
        >
          {author}
        </Text>

        <span className="flex size-5 items-center justify-center">
          <UserIcon />
        </span>
      </div>
    </li>
  );
}
