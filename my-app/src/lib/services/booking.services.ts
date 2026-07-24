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
import { dbCreatePayment, dbFindPayment } from "../repositories/payment.repo";
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
  departureData: {
    departureId: number;
    room: RoomType;
    adults: number;
    children: number;
    numberOfRooms: number;
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

  const isRealDepartureDates = tour.departures.find(
    (item) => item.id === data.departureData.departureId,
  );

  if (!isRealDepartureDates) {
    throw new Error("Tour dates does not exist");
  }

  const isThisBookingExist = await dbFindBookingByFilter({
    userId: user.id,
    tourId: tour.id,
  });

  console.log("isThisBookingExist", isThisBookingExist);

  if (isThisBookingExist?.status === BookingStatus.confirmed) {
    throw new Error("You have already booked this tour.");
  }

  if (isThisBookingExist?.status === BookingStatus.pending) {
    const payment = await dbFindPayment({
      bookingId: isThisBookingExist.id,
      status: PaymentStatus.pending,
    });
    if (payment?.status === PaymentStatus.pending) {
      return {
        bookingId: isThisBookingExist.id,
        paymentId: payment.id,
      };
    }

    const newPayment = await dbCreatePayment({
      bookingId: isThisBookingExist.id,
      provider: PaymentProvider.stripe,
      status: PaymentStatus.pending,
    });

    return {
      bookingId: isThisBookingExist.id,
      paymentId: newPayment.id,
    };
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
    departureId: isRealDepartureDates.id,
    children: data.departureData.children,
    adults: data.departureData.adults,
    room: data.departureData.room,
    numberOfRooms: data.departureData.numberOfRooms,
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
