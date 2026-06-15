import { Suspense } from "react";
import Signup from "./Signup";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Signup />
    </Suspense>
  );
}
