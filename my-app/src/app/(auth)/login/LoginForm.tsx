"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/Button";
import {
  LoginSchema,
  loginValidationSchema,
} from "@/lib/validations/auth.validation";
import InputField from "@/components/InputField";
import InputPassword from "@/components/InputPassword";
import { handleApiError } from "@/lib/utility/handleApiError";
import toast from "react-hot-toast";
import ForgotPasswordBtn from "@/components/ForgotPasswordBtn";
import { Text } from "@/components/Text";
import SignWithSocialMedia from "@/components/SignWithSocialMedia";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
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

      <div className="w-full flex gap-25 mb-10">
        <Button variant="primary" size="sm" type="submit">
          Login
        </Button>

        <ForgotPasswordBtn />
      </div>

      <div className="flex gap-2 items-center justify-between mb-10">
        <p className="border-t border-t-white/10 w-full"></p>
        <Text as="p" color="white60" size="md" className="text-center w-140">
          Or sign in with
        </Text>
        <p className="border-t border-t-white/10 w-full"></p>
      </div>

      <SignWithSocialMedia />
    </form>
  );
}
