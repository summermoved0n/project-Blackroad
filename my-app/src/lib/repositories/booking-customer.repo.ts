import { BookingCustomerWhereUniqueInput } from "../../../generated/prisma/models";
import { prisma } from "../prisma";

type CustomerCreateProps = {
  email: string;
  phoneNumber: string;
  fullName: string;
  city: string;
  address: string;
  region: string | null;
  country: string;
  specialWishes: string | null;
  guestArrivalTime: string | null;
};

export const dbCreateCustomer = async (data: CustomerCreateProps) =>
  prisma.bookingCustomer.create({ data });

export const dbFindCustomerSnapshot = async (
  filter: BookingCustomerWhereUniqueInput,
) => prisma.bookingCustomer.findUnique({ where: filter });
