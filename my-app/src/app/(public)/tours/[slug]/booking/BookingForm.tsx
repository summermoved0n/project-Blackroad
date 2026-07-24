"use client";

import {
  BookingSchema,
  bookingInterfaceSchema,
} from "@/lib/validations/booking.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookingFormUserInfo from "./BookingFormUserInfo";
import BookingFormAddress from "./BookingFormAddress";
import InputField from "@/components/InputField";
import BookingFormArrivalTime from "./BookingFormArrivalTime";
import BookingFormPolicy from "./BookingFormPolicy";
import { Button } from "@/components/Button";
import { UserPayload } from "@/types/user.types";
import axios from "axios";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/utility/handleApiError";
import PaymentForm from "@/app/(public)/hotels/PaymentForm";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useFilters } from "@/hooks/useFilters";
import BookingNotFound from "./BookingNotFound";

export default function BookingForm({
  user,
  tourId,
}: {
  user: UserPayload;
  tourId: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { searchParams } = useFilters();

  const departureDates = searchParams.get("departureDates");
  const roomType = searchParams.get("roomType");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const rooms = searchParams.get("rooms");

  const [arrivalTime, setArrivalTime] = useState("");

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingInterfaceSchema),
  });

  useEffect(() => {
    if (user?.name) {
      const parts = user.name.split(" ");

      reset({
        name: parts[0] || "",
        surname: parts.slice(1).join(" ") || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: BookingSchema) => {
    console.log(data);
    try {
      const checkout = {
        tourId,
        customerInfo: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
        departureData: {
          departureId: Number(departureDates),
          room: roomType,
          adults: Number(adults),
          children: Number(children),
          numberOfRooms: Number(rooms),
        },
        contactDetails: {
          city: data.city,
          address: data.address,
          region: data.region ?? null,
          country: data.country,
        },
        additional: {
          specialWishes: data.specialWishes ?? null,
          guestArrivalTime: arrivalTime === "" ? null : arrivalTime,
        },
      };

      if (!elements || !stripe) {
        return toast.error("Payment not ready");
      }

      const booking = await axios.post("/api/booking/checkout", checkout);
      const response = await axios.post("/api/stripe/payment-intent", {
        bookingId: booking.data.response.bookingId,
        paymentId: booking.data.response.paymentId,
      });

      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        return toast.error("Card wasn't get");
      }

      const result = await stripe.confirmCardPayment(
        response.data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${data.name} ${data.surname}`,
              email: data.email,
              phone: data.phoneNumber,
            },
          },
        },
      );

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment success");
        router.replace(
          `/payment/success?payment_intent=${result.paymentIntent.id}`,
        );
        return;
      }

      toast.error("Payment was not completed");
    } catch (error) {
      handleApiError(error);
    }
  };

  if (!departureDates || !roomType || !adults || !children || !rooms) {
    return <BookingNotFound />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary mb-7.5 px-4 py-12.5 lg:px-15 lg:py-15 flex flex-col gap-17.5"
    >
      <BookingFormUserInfo
        errors={errors}
        register={register}
        control={control}
      />
      <BookingFormAddress errors={errors} register={register} />
      <InputField
        name="specialWishes"
        lable="Special wishes"
        placeholder="Write your special wishes"
        register={register}
        error={errors.specialWishes}
      />
      <BookingFormArrivalTime
        arrivalTime={arrivalTime}
        setArrivalTime={setArrivalTime}
      />
      <PaymentForm />
      <BookingFormPolicy />
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || !stripe || !elements}
      >
        Book and pay
      </Button>
    </form>
  );
}
