"use client";

import { IMaskInput } from "react-imask";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  EditUserInfoSchema,
  editUserInfoSchema,
} from "@/lib/validations/auth.validation";
import InputField from "@/components/InputField";
import { handleApiError } from "@/lib/utility/handleApiError";
import toast from "react-hot-toast";
import { Text } from "@/components/Text";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import ButtonWithArrow from "@/components/ButtonWithArrow";

export default function LoginForm() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(true);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserInfoSchema>({
    resolver: zodResolver(editUserInfoSchema),
  });

  const onSubmit = async (data: EditUserInfoSchema) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      router.replace("/tours");
      router.refresh();
      toast.success(response.data.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="w-screen h-screen px-15 flex flex-col gap-20 justify-center items-center">
        <Text as="h1" color="white" size="lg">
          Edit profile
        </Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center gap-10"
        >
          <div className="grid grid-cols-2 gap-10">
            <InputField
              name="name"
              lable="Full name"
              placeholder="Your name"
              register={register}
              error={errors.name}
            />

            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="+{1} (000) 000-00-00"
                  placeholder="+1 (555) 555-55-55"
                  className=""
                />
              )}
            />

            <InputField
              name="dateOfBirth"
              lable="Date of birth"
              placeholder="MM/DD/YYYY"
              type="number"
              register={register}
              error={errors.dateOfBirth}
            />

            <InputField
              name="phoneNumber"
              lable="Phone number"
              type="number"
              placeholder="+1"
              className=""
              register={register}
              error={errors.phoneNumber}
            />

            <InputField
              name="email"
              lable="E-mail"
              placeholder="email@gmail.com"
              register={register}
              error={errors.email}
            />
          </div>

          <div className="w-full flex justify-center">
            <ButtonWithArrow className="text-white" whiteArrow whiteCircle>
              Confirm changes
            </ButtonWithArrow>
          </div>
        </form>
      </div>
    </Modal>
  );
}
