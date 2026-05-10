"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { useState } from "react";
import SignupForm from "./SignupForm";

export default function Signup() {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(true);

  return (
    <section>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="py-50 px-4">
          <p className="text-white">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
          </p>

          <SignupForm />
        </div>
      </Modal>
    </section>
  );
}
