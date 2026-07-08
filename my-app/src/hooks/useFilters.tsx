"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("setFilter", { key, value });

    if (!value || value === "_") {
      params.delete(key);
      return router.replace(`?${params}`, { scroll: false });
    }

    params.set(key, value);

    router.replace(`?${params}`, { scroll: false });
  };

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.set("page", "1");
    } else {
      params.set("page", page.toString());
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const getPages = (current: number, total: number) => {
    const delta = 1;

    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);

    if (current === 1) {
      end = Math.min(total, 3);
    }

    if (current === total) {
      start = Math.max(1, total - 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const clearFilter = () => router.replace("/tours?page=1", { scroll: false });

  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const current = params.get(key)?.split(",") || [];

    let next;

    if (current.includes(value)) {
      next = current.filter((v) => v !== value);
    } else {
      next = [...current, value];
    }

    if (next.length > 0) {
      params.set("page", "1");
      params.set(key, next.join(","));
    } else {
      params.set("page", "1");
      params.delete(key);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    setPage,
    getPages,
    toggleFilter,
    searchParams,
    clearFilter,
    setFilter,
  };
}
