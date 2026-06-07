import { NewsletterSubscriberWhereUniqueInput } from "../../../generated/prisma/models";
import { prisma } from "../prisma";

type CreateSubscriberProps = {
  email: string;
  confirmed?: boolean;
  token: string;
};

type UpdateSubscriberProps = {
  confirmed: boolean;
  token: string;
};

export const dbFindNewsletterSubscriber = async (
  filter: NewsletterSubscriberWhereUniqueInput,
) => {
  return prisma.newsletterSubscriber.findUnique({
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
