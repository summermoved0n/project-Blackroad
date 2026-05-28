"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { UserPayload } from "@/types/user.types";
import { useRouter } from "next/navigation";

type User = {
  user: UserPayload
};

export default function ProfileInfo({ user }: User) {
  const router = useRouter();
  return (
    <div className="bg-[#171717] p-15">
      <Text as="h2" color="white" size="lg" className="mb-12.5 uppercase">
        My information
      </Text>

      <div className="grid grid-cols-[1fr_2fr] grid-rows-2 gap-12.5 mb-12.5">
        <div className="flex flex-col gap-4">
          <Text as="p" color="white60" size="sm">
            Full name
          </Text>
          <Text as="p" color="white" size="md">
            {user?.name ? user.name : "Anonim"}
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <Text as="p" color="white60" size="sm">
            Date of birth
          </Text>
          <Text as="p" color="white" size="md">
            {user?.dateOfBirth ? "12.12.2020" : "00:00:0000"}
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <Text as="p" color="white60" size="sm">
            Phone number
          </Text>
          <Text as="p" color="white" size="md">
            {user?.phoneNumber ? user.phoneNumber : "__-__-____"}
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <Text as="p" color="white60" size="sm">
            E-mail
          </Text>
          <Text as="p" color="white" size="md">
            {user?.email ? user.email : "Anonim"}
          </Text>
        </div>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          router.push("/profile/edit");
        }}
      >
        Edit
      </Button>
    </div>
  );
}
