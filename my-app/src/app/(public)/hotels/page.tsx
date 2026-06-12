import ComingSoon from "@/components/ComingSoon";
import PayBtn from "./PayBtn";

export default function page() {
  // return <ComingSoon />;
  return (
    <div className="pt-20 bg-primary">
      <div className="py-20 px-20 bg-secondary">
        <PayBtn />
      </div>
    </div>
  );
}
