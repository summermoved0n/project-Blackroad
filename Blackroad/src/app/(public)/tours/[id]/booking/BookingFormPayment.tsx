import { AddCardIcon, CardIcon, MastercardBigIcon } from "@/components/icons";
import InputField from "@/components/InputField";
import MaskInput from "@/components/MaskInput";
import { Text } from "@/components/Text";
import { Controller } from "react-hook-form";

export default function BookingFormPayment({ ...props }) {
  return (
    <div>
      <Text as="p" color="white" size="md" className="mb-7.5">
        Payment
      </Text>
      <div className="grid grid-cols-2 xl:grid-cols-[150px_150px] justify-start gap-7.5 mb-14">
        <div>
          <div className="bg-white h-25 rounded-sm flex items-center justify-center mb-2">
            <AddCardIcon />
          </div>
          <Text as="p" color="white60" size="sm" className="text-center">
            Payment
          </Text>
        </div>
        <div>
          <div className="bg-white h-25 rounded-sm flex items-center justify-center mb-2">
            <MastercardBigIcon />
          </div>
          <Text as="p" color="white60" size="sm" className="text-center">
            Payment
          </Text>
        </div>
      </div>

      <Text as="p" color="white" size="md" className="mb-7.5">
        New card
      </Text>
      <div className="xl:w-[70%] flex flex-col gap-10 mb-9">
        <InputField
          name="cardholderName"
          lable="Cardholder's name"
          placeholder="Full name"
          register={props.register}
          error={props.errors.cardholderName}
          darkThemeInput
        />
        <Controller
          name="cardNumber"
          control={props.control}
          render={({ field }) => (
            <MaskInput
              idName="cardNumber"
              lable="Card number"
              mask="0000-0000-0000-0000"
              icon={<CardIcon />}
              error={props.errors.cardNumber}
              value={field.value ?? ""}
              onChange={field.onChange}
              darkThemeInput
            />
          )}
        />
        <div className="flex gap-7.5">
          <Controller
            name="cardExpire"
            control={props.control}
            render={({ field }) => (
              <MaskInput
                idName="cardExpire"
                lable="Validity period"
                mask="00/00"
                placeholder="MM/YY"
                error={props.errors.cardExpire}
                value={field.value ?? ""}
                onChange={field.onChange}
                darkThemeInput
              />
            )}
          />
          <Controller
            name="cvcCode"
            control={props.control}
            render={({ field }) => (
              <MaskInput
                idName="cvcCode"
                lable="CVC code"
                mask="0000"
                icon={<CardIcon />}
                error={props.errors.cvcCode}
                value={field.value ?? ""}
                onChange={field.onChange}
                darkThemeInput
              />
            )}
          />
        </div>
      </div>

      <Text as="p" color="white" size="sm">
        Save your card for future payments
      </Text>
    </div>
  );
}
