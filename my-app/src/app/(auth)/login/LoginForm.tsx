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
import { useState } from "react";
import { ShowPasswordIcon } from "@/components/icons/ShowPasswordIcon";
import { HidePasswordIcon } from "@/components/icons/HidePasswordIcon";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      await axios.post("/api/auth/login", data);
      router.replace("/tours");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-7.5"
    >
      <label className="text-white flex flex-col">
        E-mail
        <input
          {...register("email")}
          className="border-b border-white/10 focus:border-[#ea9c3f] text-white py-3 outline-none"
          placeholder="email@example.com"
          type="email"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </label>

      <label className="relative text-white flex flex-col">
        Password
        <input
          {...register("password")}
          className="border-b border-white/10 focus:border-[#ea9c3f] text-white py-3 outline-none"
          placeholder="●  ●  ●  ●  ●  ●  ●  ●"
          type={!showPassword ? "password" : "text"}
          autoComplete="current-password"
        />
        <button
          className="absolute right-0 top-1/2 translate-y-1/2"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
      </label>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
