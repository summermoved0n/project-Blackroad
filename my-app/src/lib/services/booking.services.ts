import {
  BookingStatus,
  PaymentProvider,
  PaymentStatus,
  RoomType,
} from "../../../generated/prisma/enums";
import { dbFindUser } from "../repositories/auth.repo";
import { dbCreateCustomer } from "../repositories/booking-customer.repo";
import {
  dbCreateBooking,
  dbFindBookingByFilter,
} from "../repositories/booking.repo";
import { dbCreatePayment } from "../repositories/payment.repo";
import { dbFindTour } from "../repositories/tour.repo";
import { getCurrentUser } from "../utility/getCurrentUser";

type BookingDataProps = {
  tourId: number;
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
  };
  contactDetails: {
    city: string;
    address: string;
    country: string;
    region?: string | null | undefined;
  };
  additional: {
    specialWishes?: string | null | undefined;
    guestArrivalTime?: string | null | undefined;
  };
};

export const createBooking = async (data: BookingDataProps) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await dbFindUser({ id: userId });

  if (!user) {
    throw new Error("User not found.");
  }

  const tour = await dbFindTour({ id: data.tourId });

  if (!tour) {
    throw new Error("Tour not found");
  }

  const isThisBookingExist = await dbFindBookingByFilter({
    userId: user.id,
    tourId: tour.id,
  });

  console.log("isThisBookingExist", isThisBookingExist);

  if (
    isThisBookingExist &&
    isThisBookingExist?.status !== BookingStatus.completed &&
    isThisBookingExist?.status !== BookingStatus.cancelled
  ) {
    throw new Error(
      "You have already made a booking tour with this email. Please check your email for details or contact support.",
    );
  }

  const { customerInfo, contactDetails, additional } = data;

  console.log("Creating new Customer...");

  const newCustomer = await dbCreateCustomer({
    email: customerInfo.email,
    phoneNumber: customerInfo.phoneNumber,
    fullName: `${customerInfo.name} ${customerInfo.surname}`,
    city: contactDetails.city,
    address: contactDetails.address,
    region: contactDetails.region ?? null,
    country: contactDetails.country,
    specialWishes: additional.specialWishes ?? null,
    guestArrivalTime: additional.guestArrivalTime ?? null,
  });

  console.log("Creating new booking...");

  const booking = await dbCreateBooking({
    userId: user.id,
    tourId: tour.id,
    customerId: newCustomer.id,
    guests: 2,
    room: RoomType.single,
    totalPrice: tour.price,
    status: BookingStatus.pending,
  });

  const payment = await dbCreatePayment({
    bookingId: booking.id,
    provider: PaymentProvider.stripe,
    status: PaymentStatus.pending,
  });

  return {
    bookingId: booking.id,
    paymentId: payment.id,
  };
};
