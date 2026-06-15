import React from "react";
import { Text } from "@/components/Text";
import { CrossGreyIcon } from "@/components/icons";
import { Button } from "@/components/Button";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type CancelBookingProps = {
  bookingId: number;
  setMenuItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function CancelBooking({
  bookingId,
  setMenuItem,
}: CancelBookingProps) {
  const router = useRouter();

  const handleCancel = async () => {
    try {
      const response = await axios.post("api/profile/cancel-booking", {
        bookingId,
      });

      toast.success(response.data.message);
      setMenuItem(null);
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <li className="bg-white p-5">
      <div className="flex items-center justify-between mb-5">
        <Text as="h1" color="black" size="md">
          Cancel Booking
        </Text>

        <button type="button" onClick={() => setMenuItem(null)}>
          <CrossGreyIcon />
        </button>
      </div>

      <Text as="h1" color="black60" size="sm" className="mb-5">
        According to the{" "}
        <span className="underline">Rules of the cancellation policy</span>, in
        the event of termination of the Agreement at the initiative of the
        Tourist, the Tourist will be refunded the amount paid, minus penalties
        in the amount of 25% of the total cost of the Tour.
      </Text>

      <Button
        variant="primary"
        size="sm"
        className="text-black"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
    </li>
  );
}
