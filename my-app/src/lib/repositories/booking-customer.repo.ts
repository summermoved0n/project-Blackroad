import { Prisma } from "../../../generated/prisma/browser";
import { PrismaClient } from "../../../generated/prisma/client";
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

type DbClient = PrismaClient | Prisma.TransactionClient;

export const dbCreateCustomer = async (
  db: DbClient,
  data: CustomerCreateProps,
) => db.bookingCustomer.create({ data });

export const dbFindCustomerSnapshot = async (
  filter: BookingCustomerWhereUniqueInput,
) => prisma.bookingCustomer.findUnique({ where: filter });
