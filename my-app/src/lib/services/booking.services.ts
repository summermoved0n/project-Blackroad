import {
  BookingStatus,
  DepartureStatus,
  PaymentProvider,
  PaymentStatus,
  RoomType,
} from "../../../generated/prisma/enums";
import { prisma } from "../prisma";
import { dbFindUser } from "../repositories/auth.repo";
import { dbCreateCustomer } from "../repositories/booking-customer.repo";
import {
  dbCreateBooking,
  dbFindBookingByFilter,
} from "../repositories/booking.repo";
import { dbCreatePayment, dbFindPayment } from "../repositories/payment.repo";
import { dbFindTour } from "../repositories/tour.repo";
import { dbExpirePendingBooking } from "../repositories/profile.repo";
import { getCurrentUser } from "../utility/getCurrentUser";
import { calculateTotalPrice } from "../utility/helpers";

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
    departureId: isRealDepartureDates.id,
    status: {
      in: [BookingStatus.pending, BookingStatus.confirmed],
    },
  });

  if (isThisBookingExist?.status === BookingStatus.confirmed) {
    throw new Error("You have already booked this tour.");
  }

  if (isThisBookingExist?.status === BookingStatus.pending) {
    const isExpired =
      !isThisBookingExist.expiresAt ||
      isThisBookingExist.expiresAt <= new Date();

    if (isExpired) {
      await dbExpirePendingBooking({ bookingId: isThisBookingExist.id });
    } else {
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

      const newPayment = await dbCreatePayment(prisma, {
        bookingId: isThisBookingExist.id,
        provider: PaymentProvider.stripe,
        status: PaymentStatus.pending,
      });

      return {
        bookingId: isThisBookingExist.id,
        paymentId: newPayment.id,
      };
    }
  }

  const {
    customerInfo,
    contactDetails,
    additional,
    departureData: { adults, room, children, numberOfRooms },
  } = data;

  const bookedSeats = adults + children;

  const { totalPrice, taxPrice } = calculateTotalPrice(
    tour.price,
    adults.toString(),
    children.toString(),
    numberOfRooms.toString(),
    room,
  );

  const { booking, payment } = await prisma.$transaction(async (tx) => {
    const reservation = await tx.tourDeparture.updateMany({
      where: {
        id: isRealDepartureDates.id,
        tourId: tour.id,
        status: DepartureStatus.available,
        startDate: { gt: new Date() },
        availableSeats: {
          gte: bookedSeats,
          lte: tour.capacity,
        },
      },
      data: {
        availableSeats: {
          decrement: bookedSeats,
        },
      },
    });

    if (reservation.count !== 1) {
      throw new Error("Departure is unavailable or does not have enough seats");
    }

    const newCustomer = await dbCreateCustomer(tx, {
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

    const booking = await dbCreateBooking(tx, {
      userId: user.id,
      tourId: tour.id,
      customerId: newCustomer.id,
      departureId: isRealDepartureDates.id,
      children,
      adults,
      room,
      numberOfRooms,
      totalPrice: totalPrice + taxPrice,
      status: BookingStatus.pending,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    const payment = await dbCreatePayment(tx, {
      bookingId: booking.id,
      provider: PaymentProvider.stripe,
      status: PaymentStatus.pending,
    });

    return { booking, payment };
  });

  return {
    bookingId: booking.id,
    paymentId: payment.id,
  };
};
