import InputField from "@/components/InputField";
import MaskInput from "@/components/MaskInput";
import { Text } from "@/components/Text";
import { Controller } from "react-hook-form";

export default function BookingFormUserInfo({ ...props }) {
  return (
    <div>
      <Text as="h2" color="white" size="md" className="mb-10">
        Enter your data
      </Text>
      <div className="flex flex-col lg:flex-wrap gap-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12.5">
          <InputField
            name="name"
            lable="Name"
            placeholder="Name"
            register={props.register}
            error={props.errors.name}
            darkThemeInput
          />
          <InputField
            name="surname"
            lable="Surname"
            placeholder="Surname"
            register={props.register}
            error={props.errors.surname}
            darkThemeInput
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12.5">
          <InputField
            name="email"
            lable="E-mail"
            placeholder="email@gmail.com"
            register={props.register}
            error={props.errors.email}
            darkThemeInput
          />
          <Controller
            name="phoneNumber"
            control={props.control}
            render={({ field }) => (
              <MaskInput
                idName="phoneNumber"
                lable="Phone number"
                mask="+1 (000) 000-00-00"
                placeholder="+1 (709) 123-45-67"
                error={props.errors.phoneNumber}
                value={field.value ?? ""}
                onChange={field.onChange}
                darkThemeInput
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
