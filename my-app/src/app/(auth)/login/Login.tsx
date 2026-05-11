"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import Modal from "@/components/Modal";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(true);

  const logOut = async () => {
    await axios.post("/api/auth/logout");
    router.push("/");
  };

  return (
    <section>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="pt-50">
              <p className="text-white">GLAD TO WELCOME YOU AGAIN!</p>
              <p className="text-white">
                Don`t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Register
                </button>
              </p>
            </div>
            <div className="pt-50">
              <button className="text-white" onClick={logOut}>
                LogOut
              </button>
            </div>
          </div>
          <LoginForm />
        </div>
      </Modal>
    </section>
  );
}
