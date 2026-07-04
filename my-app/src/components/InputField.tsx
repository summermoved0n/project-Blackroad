import clsx from "clsx";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  lable: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
  darkThemeInput?: boolean;
};

export default function InputField<T extends FieldValues>({
  name,
  lable,
  type = "text",
  placeholder = "email@gmail.com",
  register,
  error,
  darkThemeInput,
  className,
}: Props<T>) {
  return (
    <div className="w-full flex flex-col">
      <label
        className={clsx(
          darkThemeInput ? "text-white/60" : "text-white ",
        )}
        htmlFor={name}
      >
        {lable}
      </label>

      <input
        id={name}
        {...register(name)}
        className={clsx(
          className,
          darkThemeInput && "placeholder:text-white/20",
          "border-b border-white/10 focus:border-accent text-white py-3 outline-none",
        )}
        placeholder={placeholder}
        type={type}
      />

      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
