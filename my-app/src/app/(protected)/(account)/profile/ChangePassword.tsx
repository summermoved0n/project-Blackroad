"use client";

import { Button } from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import { Text } from "@/components/Text";
import {
  ChangePasswordSchema,
  changePassValidationSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePassValidationSchema),
  });

  const onSubmit = () => {};
  return (
    <div className="bg-[#171717] p-15">
      <Text as="h2" color="white" size="lg" className="mb-12.5 uppercase">
        Change Password
      </Text>

      <form
        className="grid grid-cols-3 gap-15"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <InputPassword
            name="password"
            lable="Current password"
            register={register}
            error={errors.password}
          />

          <button className="w-fit right-0" type="button" onClick={() => {}}>
            <Text as="p" color="white60" size="xs">
              Forgot password?
            </Text>
          </button>
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
