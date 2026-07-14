import BookingInfoRating from "./BookingInfoRating";
import BookingInfoDates from "./BookingInfoDates";
import BookingInfoPrice from "./BookingInfoPrice";

export default function BookingInfo({ ...props }) {
  return (
    <section className="flex flex-col gap-7.5">
      <BookingInfoRating tour={props.tour} />

      <BookingInfoDates tour={props.tour} />

      <BookingInfoPrice tour={props.tour} />
    </section>
  );
}
