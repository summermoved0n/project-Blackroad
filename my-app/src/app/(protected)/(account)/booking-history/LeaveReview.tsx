import { Button } from "@/components/Button";
import { EmptyHeartIcon, EmptyStarIcon } from "@/components/icons";
import { CrossGreyIcon } from "@/components/icons/CrossGreyIcon";
import { Text } from "@/components/Text";
import { useState } from "react";

type LeaveReviewProps = {
  setMenuItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LeaveReview({ setMenuItem }: LeaveReviewProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <li className="bg-white p-5">
      <div className="flex justify-between items-center mb-5">
        <Text as="h3" color="black" size="md">
          Leave Review
        </Text>

        <button onClick={() => setMenuItem(null)}>
          <CrossGreyIcon />
        </button>
      </div>
      <div className="flex gap-1 mt-4">
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
        <EmptyStarIcon />
      </div>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          <input
            type="text"
            id="review"
            placeholder="Describe your experience"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border-b border-[#d0d0d0]/70 outline-0 py-3 mb-5 focus:border-orange-300 w-full"
          />
        </label>

        <Button
          variant="primary"
          size="sm"
          type="submit"
          className="text-black"
        >
          Submit Review
        </Button>
      </form>
    </li>
  );
}
