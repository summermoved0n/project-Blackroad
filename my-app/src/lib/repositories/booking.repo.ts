import { BookingStatus, RoomType } from "../../../generated/prisma/enums";
import { prisma } from "../prisma";

type CreateBookingProps = {
  userId: number;
  tourId: number;
  customerId: number;
  guests: number;
  room: RoomType;
  totalPrice: number;
  status: BookingStatus;
};

export const dbFindBookingById = async (id: number) =>
  prisma.booking.findUnique({
    where: { id },
  });

export const dbFindBookingByFilter = async (filter: {
  userId: number;
  tourId?: number;
}) =>
  prisma.booking.findFirst({
    where: filter,
  });

export const dbCreateBooking = async (data: CreateBookingProps) =>
  prisma.booking.create({ data });

export const dbFindAllUserBookings = async (filter: { userId: number }) =>
  prisma.booking.findMany({
    where: filter,
    select: {
      id: true,
      status: true,
      totalPrice: true,
      tour: {
        select: {
          id: true,
          slug: true,
          title: true,
          imageUrl: true,
          departures: {},
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
