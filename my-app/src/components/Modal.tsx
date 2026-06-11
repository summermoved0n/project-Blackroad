"use client";

import { CrossIcon } from "@/components/icons/CrossIcon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
};

export default function Modal({
  children,
  openModal,
  setOpenModal,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(false);
    };
    if (openModal) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openModal, setOpenModal]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 bg-secondary transition-opacity duration-300",
        openModal ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={() => setOpenModal(false)}
    >
      <div className="perspective-[1000px] relative w-full h-full flex items-center justify-center cursor-pointer">
        <button
          className="absolute z-10 top-10 right-10 hover:scale-125 transition"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <CrossIcon />
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            "w-full h-full md:w-fit md:h-fit transition-all duration-300 cursor-auto overflow-auto",
            openModal
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full rotate-x-45",
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    window.document.body,
  );
}
