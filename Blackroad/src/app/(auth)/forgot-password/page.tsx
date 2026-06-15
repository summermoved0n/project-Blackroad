import { Suspense } from "react";
import ForgotForm from "./ForgotForm";

export default function page() {
  return (
    <Suspense fallback={null}>
      <ForgotForm />
    </Suspense>
  );
}
