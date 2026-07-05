"use client";

import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { useState } from "react";
import { ShowPasswordIcon } from "@/components/icons/ShowPasswordIcon";
import { HidePasswordIcon } from "@/components/icons/HidePasswordIcon";

type Props<T extends FieldValues> = {
  name: Path<T>;
  lable: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export default function InputPassword<T extends FieldValues>({
  name,
  lable,
  placeholder = "Enter the password",
  register,
  error,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="text-white flex flex-col gap-5">
      <label htmlFor={name}>{lable}</label>

      <div className="relative w-full">
        <input
          id={name}
          {...register(name)}
          className="w-full border-b border-white/10 focus:border-accent text-white py-3 outline-none"
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
        />

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
      </div>

      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
