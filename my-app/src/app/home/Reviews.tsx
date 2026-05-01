import { reviewsData } from "@/lib/data/homePageData";
import { Text } from "../components/Text";
import ReviewsItem from "./ReviewsItem";
import clsx from "clsx";

export default function Reviews({ isDark }: { isDark?: boolean }) {
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

      <ul className="md:grid md:grid-cols-3">
        {reviewsData.map(({ id, stars, description, author }) => (
          <ReviewsItem
            key={id}
            stars={stars}
            description={description}
            author={author}
            isDark={isDark}
          />
        ))}
      </ul>
    </section>
  );
}
