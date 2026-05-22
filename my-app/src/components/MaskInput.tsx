"use client";

import clsx from "clsx";
import { FieldError } from "react-hook-form";
import { IMaskInput } from "react-imask";

type InputProps = {
  className?: string;
  idName: string;
  lable: string;
  placeholder: string;
  mask: string;
  error?: FieldError;
  value: string;
  onChange: (value: string) => void;
};

export default function MaskInput({
  value,
  onChange,
  className,
  mask,
  lable,
  idName,
  error,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label className="text-white" htmlFor={idName}>
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
          "w-full border-b border-white/10 focus:border-[#ea9c3f] text-white py-3 outline-none",
        )}
      />

      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
