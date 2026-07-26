"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import {
  SignupSchema,
  signupValidationSchema,
} from "@/lib/validations/auth.validation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { handleApiError } from "@/lib/utility/handleApiError";
import InputField from "@/components/InputField";
import InputPassword from "@/components/InputPassword";
import { Button } from "@/components/Button";
import { useState } from "react";
import Spinner from "@/components/ui/loader/Spinner";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupValidationSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", data);
      router.back();
      router.refresh();
      toast.success(response.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-7.5"
    >
      <InputField
        name="email"
        lable="E-mail"
        placeholder="email@gmail.com"
        register={register}
        error={errors.email}
      />

      <InputPassword
        name="password"
        lable="Password"
        register={register}
        error={errors.password}
      />

      <InputPassword
        name="confirmPassword"
        lable="Confirm Password"
        register={register}
        error={errors.confirmPassword}
      />

      <Button variant="primary" type="submit">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner size="sm" />
          </div>
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}
