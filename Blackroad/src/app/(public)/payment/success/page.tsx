import { Text } from "@/components/Text";
import React from "react";

export default function page() {
  return (
    <div className="pt-20 bg-primary">
      <div className="bg-secondary p-10">
        <Text as="p" color="white" size="md">
          Payment successful
        </Text>
      </div>
    </div>
  );
}
