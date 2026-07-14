"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { useState } from "react";
import SignupForm from "./SignupForm";
import { Text } from "@/components/Text";
import SignWithSocialMedia from "@/components/SignWithSocialMedia";

export default function Signup() {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(true);

  return (
    <section>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="px-4 pt-30 md:p-20 flex flex-col justify-center items-center gap-7.5">
          <Text
            as="p"
            color="white"
            size="lg"
            className="uppercase text-center"
          >
            create an account
          </Text>

          <SignWithSocialMedia />

          <div className="w-full flex gap-2 items-center justify-between">
            <p className="border-t border-t-white/10 w-full"></p>
            <Text as="p" color="white60" size="md" className="text-center w-10">
              Or
            </Text>
            <p className="border-t border-t-white/10 w-full"></p>
          </div>

          <div className="flex gap-5 flex-col items-center justify-between">
            <Text as="p" color="white60" size="md">
              Register using email
            </Text>

            <Text as="p" color="white60" size="md" className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                <Text
                  as="span"
                  color="white"
                  size="md"
                  className="hover:text-accent transition"
                >
                  Log in
                </Text>
              </button>
            </Text>
          </div>

          <SignupForm />
        </div>
      </Modal>
    </section>
  );
}
