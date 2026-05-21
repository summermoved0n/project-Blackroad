import { Suspense } from "react";
import Edit from "./Edit";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Edit />
    </Suspense>
  );
}
