"use client";

// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { email, password, confirmPassword };
    await axios.post("/api/auth/signup", formData);
  };

  return (
    <form onSubmit={handleLogin} className="pt-20 flex flex-col gap-4">
      <h1 className="text-white">Signup</h1>

      <input
        className="border border-amber-200 text-white"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border border-amber-200 text-white"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="border border-amber-200 text-white"
        placeholder="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        className="bg-amber-500 text-white py-2 px-4 rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
