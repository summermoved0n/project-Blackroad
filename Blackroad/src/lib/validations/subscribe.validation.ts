import { z } from "zod";

export const subscribeEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email")
    .or(z.literal("")),
});

export const subscribeConfirmSchema = z.object({
  token: z.string().trim().min(1).max(255),
});

export type SubscribeEmailSchema = z.infer<typeof subscribeEmailSchema>;
export type SubscribeConfirmSchema = z.infer<typeof subscribeConfirmSchema>;
