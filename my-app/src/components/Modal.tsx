"use client";

import { CrossIcon } from "@/components/icons/CrossIcon";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
  isUIModal?: boolean;
  portal?: boolean;
};

export default function Modal({
  children,
  openModal,
  setOpenModal,
  isUIModal,
  portal = true,
}: ModalProps) {
  const router = useRouter();
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
      if (e.key === "Escape" && isUIModal === true) {
        return setOpenModal(false);
      }
      if (e.key === "Escape") router.back();
    };
    if (openModal) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openModal, setOpenModal, router, isUIModal]);

  const content = (
    <div
      className={clsx(
        "fixed inset-0 z-50 bg-secondary transition-opacity duration-300",
        openModal ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="perspective-[1000px] relative w-full h-full flex items-center justify-center">
        <button
          className="absolute z-10 top-10 right-4 transition w-10 h-10 flex items-center justify-center text-white hover:text-accent"
          onClick={() => {
            if (isUIModal) {
              return setOpenModal(false);
            }

            router.back();
          }}
        >
          <CrossIcon />
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            "w-full h-full transition-all duration-300 cursor-auto overflow-auto",
            openModal
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full rotate-x-45",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (!portal) return content;

  return mounted ? createPortal(content, document.body) : null;
}
