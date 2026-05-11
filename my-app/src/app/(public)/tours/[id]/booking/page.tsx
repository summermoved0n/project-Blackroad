import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const cookieStore = await cookies();

  const token = cookieStore;
  console.log(token);
  return <div className="pt-50">page with token?</div>;
}
