import { Prisma } from "../../../generated/prisma/browser";
import { PrismaClient } from "../../../generated/prisma/client";
import { BookingStatus, RoomType } from "../../../generated/prisma/enums";
import { prisma } from "../prisma";

type CreateBookingProps = {
  userId: number;
  tourId: number;
  customerId: number;
  departureId: number;
  adults: number;
  children: number;
  room: RoomType;
  totalPrice: number;
  status: BookingStatus;
  numberOfRooms: number;
  expiresAt: Date;
};

type DbClient = PrismaClient | Prisma.TransactionClient;

export const dbFindBookingById = async (id: number) =>
  prisma.booking.findUnique({
    where: { id },
    include: {
      departure: {
        select: {
          id: true,
          tourId: true,
          startDate: true,
          status: true,
        },
      },
    },
  });

export const dbFindBookingEmailData = async (id: number) =>
  prisma.booking.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      totalPrice: true,
      room: true,
      adults: true,
      children: true,
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      tour: {
        select: {
          title: true,
          imageUrl: true,
        },
      },
      departure: {
        select: {
          startDate: true,
          endDate: true,
        },
      },
    },
  });

export const dbFindBookingByFilter = async (filter: {
  userId: number;
  tourId?: number;
  departureId?: number;
  status?: BookingStatus | { in: BookingStatus[] };
}) =>
  prisma.booking.findFirst({
    where: filter,
  });

export const dbCreateBooking = async (db: DbClient, data: CreateBookingProps) =>
  db.booking.create({ data });

export const dbFindAllUserBookings = async (filter: { userId: number }) =>
  prisma.booking.findMany({
    where: filter,
    select: {
      id: true,
      status: true,
      totalPrice: true,
      user: {
        select: {
          id: true,
        },
      },
      tour: {
        select: {
          id: true,
          slug: true,
          title: true,
          imageUrl: true,
        },
      },
      departure: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  });

export const dbUpdateBooking = async (
  filter: { id: number },
  data: { status: BookingStatus },
) =>
  prisma.booking.update({
    where: filter,
    data,
  });
