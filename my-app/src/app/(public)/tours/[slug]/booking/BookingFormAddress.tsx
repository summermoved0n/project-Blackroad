import InputField from "@/components/InputField";
import { Text } from "@/components/Text";

export default function BookingFormAddress({ ...props }) {
  return (
    <div>
      <Text as="h2" color="white" size="md" className="mb-10">
        Contact details
      </Text>
      <div className="flex flex-wrap gap-10">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-12.5">
          <InputField
            name="city"
            lable="City"
            placeholder="Enter the city"
            register={props.register}
            error={props.errors.city}
            darkThemeInput
          />
          <InputField
            name="region"
            lable="Region"
            placeholder="Enter region"
            register={props.register}
            error={props.errors.region}
            darkThemeInput
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-12.5">
          <InputField
            name="address"
            lable="Address"
            placeholder="Enter an address"
            register={props.register}
            error={props.errors.surname}
            darkThemeInput
          />
          <InputField
            name="country"
            lable="Country"
            placeholder="Enter country"
            register={props.register}
            error={props.errors.country}
            darkThemeInput
          />
        </div>
      </div>
    </div>
  );
}
