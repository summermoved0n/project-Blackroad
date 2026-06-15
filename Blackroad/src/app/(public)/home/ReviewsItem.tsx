import ReviewStars from "@/components/ReviewStars";
import { Text } from "@/components/Text";
import { UserIcon } from "@/components/icons";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
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
        "w-40 flex flex-col items-center justify-between gap-7.5 md:gap-10 py-12.5 md:px-5 border border-l-0 border-r-0 md:border-l md:border-r  border-[rgba(23,23,23,0.1)]",

        "first:border-l-0 last:border-r-0 md:first:border-b md:last:border-t md:first:border-l-0 md:first:border-r-0 md:last:border-r-0 md:last:border-l-0",

        isDark && "border-white/20",
        "flex-[0_0_100%] md:flex-[0_0_34%]",
      )}
    >
      <ReviewStars stars={stars} />
      <Text
        as="p"
        color={isDark ? "white60" : "black60"}
        size="sm"
        className="text-center w-100 md:w-fit line-clamp-4 select-none"
      >
        {description}
      </Text>
      <div className="flex justify-center items-center gap-2.5">
        <Text
          as="p"
          color={isDark ? "white" : "black"}
          size="sm"
          className="select-none"
        >
          {author}
        </Text>
        <UserIcon />
      </div>
    </li>
  );
}
