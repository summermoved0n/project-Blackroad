import { NewsletterSubscriberWhereUniqueInput } from "../../../generated/prisma/models";
import { prisma } from "../prisma";

type CreateSubscriberProps = {
  email: string;
  confirmed?: boolean;
  verificationToken: string | null;
};

type UpdateSubscriberProps = {
  confirmed: boolean;
  verificationToken: string | null;
};

type FindSubscriberProps = {
  email?: string;
  verificationToken?: string;
};

export const dbFindNewsletterSubscriber = async (
  filter: FindSubscriberProps,
) => {
  return prisma.newsletterSubscriber.findFirst({
    where: filter,
  });
};

export const dbCreateSubscriber = async (data: CreateSubscriberProps) => {
  return prisma.newsletterSubscriber.create({
    data: data,
  });
};

export const dbUpdateSubscriber = async (
  filter: NewsletterSubscriberWhereUniqueInput,
  data: UpdateSubscriberProps,
) => {
  return prisma.newsletterSubscriber.update({
    where: filter,
    data,
  });
};
