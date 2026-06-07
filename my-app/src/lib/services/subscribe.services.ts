import { nanoid } from "nanoid";
import {
  dbCreateSubscriber,
  dbFindNewsletterSubscriber,
  dbUpdateSubscriber,
} from "../repositories/subscribers.repo";
import { resend } from "../resend";
import { getCurrentUser } from "../utility/getCurrentUser";
import { dbFindUser } from "../repositories/auth.repo";

const { RESEND_EMAIL_FROM, BASE_URL } = process.env;

export const userSubscribe = async ({ email }: { email: string }) => {
  const userId = await getCurrentUser();

  if (userId) {
    const user = await dbFindUser({ id: userId });

    if (user?.email !== email) {
      throw new Error("Email does not match with the logged in user");
    }

    const subscriber = await dbFindNewsletterSubscriber({ email });

    if (subscriber?.confirmed) {
      throw new Error("You are already subscribed to the newsletter");
    }

    const newFollower = await dbCreateSubscriber({
      email: user.email,
      token: "",
      confirmed: true,
    });

    return newFollower;
  }

  const token = nanoid();

  await dbCreateSubscriber({
    email,
    token,
  });

  await resend.emails.send({
    from: RESEND_EMAIL_FROM!,
    to: email,
    subject: "Subscribe to Blackroad Newsletter",
    html: `<a href="${BASE_URL}/subscribe/confirm?token=${token}" target="_blank">Click to subscribe</a>`,
  });
};

export const subscribeConfirm = async ({ token }: { token: string }) => {
  const subscriber = await dbFindNewsletterSubscriber({ token });

  if (subscriber?.token !== token) {
    throw new Error("Wrong token or Subscriber doesn't exist");
  }

  await dbUpdateSubscriber(
    { id: subscriber.id },
    { confirmed: true, token: "" },
  );
};
