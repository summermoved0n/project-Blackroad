"use client";

import { Button } from "@/components/Button";
import ForgotPasswordBtn from "@/components/ForgotPasswordBtn";
import InputPassword from "@/components/InputPassword";
import { Text } from "@/components/Text";
import { handleApiError } from "@/lib/utility/handleApiError";
import {
  ChangePasswordSchema,
  changePassValidationSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePassValidationSchema),
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      const response = await axios.post("/api/auth/change-password", data);
      toast.success(response.data.message);
      reset();
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="bg-primary p-5 lg:p-15">
      <Text as="h2" color="white" size="lg" className="mb-12.5 uppercase">
        Change Password
      </Text>

      <form
        className="grid lg:grid-cols-3 gap-7.5 lg:gap-15"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <InputPassword
            name="password"
            lable="Current password"
            register={register}
            error={errors.password}
          />

          <div className="w-full flex justify-end">
            <ForgotPasswordBtn />
          </div>
        </div>

        <InputPassword
          name="newPassword"
          lable="New password"
          register={register}
          error={errors.newPassword}
        />

        <InputPassword
          name="confirmNewPassword"
          lable="Re-enter the password"
          register={register}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" variant="primary" size="sm">
          Save
        </Button>
      </form>
    </div>
  );
}
