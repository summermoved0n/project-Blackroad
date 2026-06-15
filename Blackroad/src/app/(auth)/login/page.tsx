import { Suspense } from "react";
import Login from "./Login";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
