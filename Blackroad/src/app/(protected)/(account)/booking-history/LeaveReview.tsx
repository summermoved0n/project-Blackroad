"use client";

import { Button } from "@/components/Button";
import { EmptyStarIcon } from "@/components/icons";
import { CrossGreyIcon } from "@/components/icons/CrossGreyIcon";
import { Text } from "@/components/Text";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type LeaveReviewProps = {
  bookingId: number;
  setMenuItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LeaveReview({
  bookingId,
  setMenuItem,
}: LeaveReviewProps) {
  const router = useRouter();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const payload = {
        bookingId,
        review,
        rating,
      };

      const response = await axios.post("/api/profile/review", payload);
      toast.success(response.data.message);
      setMenuItem(null);
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
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
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            {rating >= star ? <EmptyStarIcon filled /> : <EmptyStarIcon />}
          </button>
        ))}
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
            className="border-b border-[#d0d0d0]/70 outline-0 py-3 mb-5 focus:border-orange-300 w-full text-lg"
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
