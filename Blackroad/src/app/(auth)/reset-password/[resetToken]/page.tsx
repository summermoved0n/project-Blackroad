import { Suspense } from "react";
import ResetForm from "./ResetForm";

export default function page() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}
