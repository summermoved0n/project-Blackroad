import { BookingStatus, RoomType } from "../../../generated/prisma/enums";
import { dbFindUser } from "../repositories/auth.repo";
import {
  dbCreateCustomer,
  dbFindCustomerSnapshot,
} from "../repositories/booking-customer.repo";
import { dbCreateBooking } from "../repositories/booking.repo";
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

  const { customerInfo, contactDetails, additional } = data;

  const existedCustomerSnapshot = await dbFindCustomerSnapshot({
    email: customerInfo.email,
  });

  if (existedCustomerSnapshot) {
    throw new Error("Email already in use");
  }

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

  console.log("I reached this field");

  await dbCreateBooking({
    userId: user.id,
    tourId: tour.id,
    customerId: newCustomer.id,
    guests: 2,
    room: RoomType.single,
    totalPrice: 2,
    status: BookingStatus.pending,
  });
};
