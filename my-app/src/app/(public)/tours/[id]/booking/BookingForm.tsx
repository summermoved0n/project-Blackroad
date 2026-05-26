"use client";

import {
  BookingSchema,
  bookingValidationSchema,
} from "@/lib/validations/booking.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BookingFormUserInfo from "./BookingFormUserInfo";
import BookingFormAddress from "./BookingFormAddress";
import InputField from "@/components/InputField";
import BookingFormArrivalTime from "./BookingFormArrivalTime";
import BookingFormPayment from "./BookingFormPayment";
import BookingFormPolicy from "./BookingFormPolicy";
import { Button } from "@/components/Button";

type UserProps = {
  user: {
    id: number;
    email: string;
    verificationToken: string;
    resetPasswordToken: string | null;
    password: string;
    name: string | null;
    phoneNumber: string | null;
    dateOfBirth: Date | null;
    isVerify: boolean;
    resetPasswordExpire: Date | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export default function BookingForm({ user }: UserProps) {
  if (!user) {
    notFound();
  }

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingValidationSchema),
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

  const onSubmit = async (data: BookingSchema) => {};

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
      <BookingFormAddress
        errors={errors}
        register={register}
        control={control}
      />
      <InputField
        name="specialWishes"
        lable="Special wishes"
        placeholder="Write your special wishes"
        register={register}
        error={errors.specialWishes}
        darkThemeInput
      />
      <BookingFormArrivalTime />
      <BookingFormPayment />
      <BookingFormPolicy />
      <Button variant="primary">Book and pay</Button>
    </form>
  );
}
