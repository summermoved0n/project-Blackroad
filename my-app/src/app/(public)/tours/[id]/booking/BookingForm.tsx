"use client";

import {
  BookingSchema,
  bookingInterfaceSchema,
} from "@/lib/validations/booking.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookingFormUserInfo from "./BookingFormUserInfo";
import BookingFormAddress from "./BookingFormAddress";
import InputField from "@/components/InputField";
import BookingFormArrivalTime from "./BookingFormArrivalTime";
import BookingFormPayment from "./BookingFormPayment";
import BookingFormPolicy from "./BookingFormPolicy";
import { Button } from "@/components/Button";
import { UserPayload } from "@/types/user.types";

type UserProps = {
  user: UserPayload;
};

export default function BookingForm({ user }: UserProps) {
  if (!user) {
    notFound();
  }

  const [arrivalTime, setArrivalTime] = useState("");

  const { id } = useParams();

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
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
    const checkout = {
      tourId: Number(id),
      customerInfo: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
      contactDetails: {
        city: data.city,
        address: data.address,
        region: data.region,
        country: data.country,
      },
      additional: {
        specialWishes: data.specialWishes,
        guestArrivalTime: arrivalTime,
      },
    };
    console.log(checkout);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#171717] mb-7.5 p-15 flex flex-col gap-17.5"
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
        darkThemeInput
      />
      <BookingFormArrivalTime
        arrivalTime={arrivalTime}
        setArrivalTime={setArrivalTime}
      />
      <BookingFormPayment
        errors={errors}
        register={register}
        control={control}
      />
      <BookingFormPolicy />
      <Button type="submit" variant="primary">
        Book and pay
      </Button>
    </form>
  );
}
