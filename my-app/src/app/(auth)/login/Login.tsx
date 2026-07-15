"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import Modal from "@/components/Modal";
import { Text } from "@/components/Text";

export default function Login() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(true);

  return (
    <section>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="px-4 pt-30 md:p-20 flex flex-col justify-center items-center">
          <div className="md:w-130 mb-7.5">
            <Text
              as="p"
              color="white"
              size="lg"
              className="uppercase text-center mb-7.5"
            >
              glad to welcome you again!
            </Text>
            <Text
              as="p"
              color="white60"
              size="md"
              className="text-center mb-7.5"
            >
              Don`t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  router.replace("/signup");
                }}
              >
                <Text
                  as="span"
                  color="white"
                  size="md"
                  className="hover:text-accent transition"
                >
                  Sign up
                </Text>
              </button>
            </Text>
          </div>

          <LoginForm />
        </div>
      </Modal>
    </section>
  );
}
