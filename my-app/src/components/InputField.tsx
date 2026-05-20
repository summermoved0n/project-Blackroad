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
};

export default function InputField<T extends FieldValues>({
  name,
  lable,
  type = "text",
  placeholder = "email@gmail.com",
  register,
  error,
}: Props<T>) {
  return (
    <div className="text-white flex flex-col">
      <label htmlFor={name}>{lable}</label>

      <input
        id={name}
        {...register(name)}
        className="border-b border-white/10 focus:border-[#ea9c3f] text-white py-3 outline-none"
        placeholder={placeholder}
        type={type}
      />

      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
