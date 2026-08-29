import { Prisma } from "../../../generated/prisma/browser";
import { PrismaClient } from "../../../generated/prisma/client";
import {
  BookingStatus,
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";
import { prisma } from "../prisma";

type CreateProps = {
  bookingId: number;
  provider: PaymentProvider;
  status: PaymentStatus;
};

type UpdateDataProps = {
  providerPaymentId?: string;
  amount?: number;
  clientSecret?: string | null;
  status?: PaymentStatus;
  errorMessage?: string;
};

type UpdateFilterProps = {
  id: number;
  bookingId: number;
  providerPaymentId: string;
  status: PaymentStatus;
};

type DbClient = PrismaClient | Prisma.TransactionClient;

export const dbCreatePayment = async (db: DbClient, data: CreateProps) =>
  db.payment.create({
    data,
  });

export const dbFindPaymentById = async (id: number) =>
  prisma.payment.findUnique({ where: { id } });

export const dbFindPayment = async ({
  bookingId,
  status,
}: {
  bookingId: number;
  status: PaymentStatus;
}) =>
  prisma.payment.findFirst({
    where: {
      bookingId,
      status,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export const dbUpdatePaymentById = async (id: number, data: UpdateDataProps) =>
  prisma.payment.update({ where: { id }, data });

export const dbUpdatePaymentByFilter = async (
  filter: UpdateFilterProps,
  data: UpdateDataProps,
) => prisma.payment.updateMany({ where: filter, data });

export const dbAttachPaymentIntent = async (
  paymentId: number,
  data: UpdateDataProps,
) =>
  prisma.payment.updateMany({
    where: {
      id: paymentId,
      status: PaymentStatus.pending,
      providerPaymentId: null,
      booking: {
        status: BookingStatus.pending,
        expiresAt: { gt: new Date() },
      },
    },
    data,
  });
