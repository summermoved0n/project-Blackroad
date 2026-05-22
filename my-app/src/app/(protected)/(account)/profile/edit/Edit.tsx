"use client";

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
import { useState } from "react";
import MaskInput from "@/components/MaskInput";
import { Button } from "@/components/Button";

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
      console.log(data);
      const response = await axios.post("/api/auth/user-update", data);
      // router.replace("/tours");
      // router.refresh();
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
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <MaskInput
                  idName="dateOfBirth"
                  lable="Date of birth"
                  mask="00/00/0000"
                  placeholder="DD/MM/YYYY"
                  error={errors.dateOfBirth}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <MaskInput
                  idName="phoneNumber"
                  lable="Phone number"
                  mask="+1 (000) 000-00-00"
                  placeholder="+1 (709) 123-45-67"
                  error={errors.phoneNumber}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
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
            <Button variant="secondary" type="submit">
              <Text
                as="p"
                color="white"
                size="sm"
                className="hover:text-orange-300 transition"
              >
                Submit changes
              </Text>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
