"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { IMaskInput } from "react-imask";

type InputProps = {
  className?: string;
  idName: string;
  lable: string;
  placeholder?: string;
  icon?: ReactNode;
  mask: string;
  error?: FieldError;
  value: string;
  darkThemeInput?: boolean;
  onChange: (value: string) => void;
};

export default function MaskInput({
  value,
  onChange,
  className,
  mask,
  lable,
  idName,
  icon,
  error,
  placeholder,
  darkThemeInput,
}: InputProps) {
  return (
    <div className={clsx("w-full", icon && "relative")}>
      {icon && <div className="absolute left-1 bottom-4">{icon}</div>}
      <label
        className={darkThemeInput ? "text-white/60" : "text-white"}
        htmlFor={idName}
      >
        {lable}
      </label>
      <IMaskInput
        id={idName}
        mask={mask}
        value={value}
        onAccept={(value) => onChange(value)}
        inputMode="numeric"
        placeholder={placeholder}
        className={clsx(
          className,
          icon && "pl-10",
          darkThemeInput && "placeholder:text-white/20",
          "w-full border-b border-white/10 focus:border-[#ea9c3f] text-white py-3 outline-none",
        )}
      />

      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
