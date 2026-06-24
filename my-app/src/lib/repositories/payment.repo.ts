import {
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
  providerPaymentId: string;
  amount: number;
  clientSecret: string | null;
};

export const dbCreatePayment = async (data: CreateProps) =>
  prisma.payment.create({
    data,
  });

export const dbFindPaymentById = async (id: number) =>
  prisma.payment.findUnique({ where: { id } });

export const dbFindPayment = async (filter: { bookingId: number }) =>
  prisma.payment.findFirst({ where: filter });

export const dbUpdatePaymentById = async (id: number, data: UpdateDataProps) =>
  prisma.payment.update({ where: { id }, data });
