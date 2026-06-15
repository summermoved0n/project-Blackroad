"use client";

import { useEffect, useState } from "react";

export function useToursPerPage() {
  const [toursPerPage, setToursPerPage] = useState(1);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) {
        setToursPerPage(1);
      } else if (width < 1024) {
        setToursPerPage(2);
      } else {
        setToursPerPage(3);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return toursPerPage;
}
