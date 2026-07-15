"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Text } from "@/components/Text";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import {
  forgotPassValidationSchema,
  ForgotPasswordSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotForm() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true);
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPassValidationSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", data);

      setShowForm(false);

      toast.success(response.data.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <section>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="px-4 pt-30 md:p-20 flex flex-col justify-center items-center">
          <div className="md:w-130 mb-7.5">
            <Text
              as="p"
              color="white"
              size="lg"
              className="uppercase text-center mb-7.5"
            >
              {showForm ? "Forgot your password?" : "Reset password"}
            </Text>
            <Text
              as="p"
              color="white60"
              size="md"
              className="text-center mb-7.5"
            >
              {showForm
                ? "Dont worry, we`ll help you recover it. Just enter your registered email and youll receive a link to reset your old password."
                : "An email with further instructions has been sent to your email address. Please check your email!"}
            </Text>
          </div>
          {showForm && (
            <form
              className="w-full flex flex-col gap-7.5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputField
                name="email"
                lable="E-mail"
                register={register}
                error={errors.email}
              />

              <Button variant="primary" type="submit">
                Renew password
              </Button>

              <div className="flex justify-center">
                <button
                  className="w-fit text-white/50 flex justify-center items-center gap-4 hover:text-accent transition"
                  onClick={() => {
                    router.replace("/login");
                  }}
                >
                  <ArrowLeftIcon />
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </section>
  );
}
