"use client";

import { Button } from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import { Text } from "@/components/Text";
import Spinner from "@/components/ui/loader/Spinner";
import { handleApiError } from "@/lib/utility/handleApiError";
import {
  resetPassValidationSchema,
  ResetPasswordSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ResetForm({ resetToken }: { resetToken: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPassValidationSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/reset-password", {
        ...data,
        resetToken,
      });

      router.replace("/login");

      toast.success(response.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-17 sm:pt-20 bg-primary">
      <div className="bg-secondary p-20 flex flex-col justify-center items-center">
        <div className="md:w-130 mb-7.5">
          <Text
            as="p"
            color="white"
            size="lg"
            className="uppercase text-center mb-7.5"
          >
            Reset password
          </Text>
          <Text as="p" color="white60" size="md" className="text-center mb-7.5">
            Dont worry, we&apos;ll help you recover it. Just enter your
            registered email and youll receive a link to reset your old
            password.
          </Text>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-10"
        >
          <InputPassword
            name="password"
            lable="Password"
            register={register}
            error={errors.password}
          />

          <InputPassword
            name="confirmPassword"
            lable="Confirm password"
            register={register}
            error={errors.confirmPassword}
          />

          <Button variant="primary" type="submit">
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner size="sm" />
              </div>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
