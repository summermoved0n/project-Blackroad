import z from "zod";

export const bookingInterfaceSchema = z.object({
  name: z.string().min(1, "Must be at least 2 characters"),
  surname: z.string().min(1, "Must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  city: z.string().min(2, "Must be at least 2 characters"),
  address: z.string().min(2, "Must be at least 2 characters"),
  region: z
    .string()
    .min(2, "Must be at least 2 characters")
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
  country: z.string().min(2, "Must be at least 2 characters"),
  specialWishes: z
    .string()
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});

export const bookingAPISchema = z.object({
  tourId: z.number(),
  customerInfo: z.object({
    name: z.string().min(2, "Must be at least 2 characters"),
    surname: z.string().min(2, "Must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string(),
  }),
  contactDetails: z.object({
    city: z.string().min(2, "Must be at least 2 characters"),
    address: z.string().min(2, "Must be at least 2 characters"),
    region: z.string().nullable().optional(),
    country: z.string().min(2, "Must be at least 2 characters"),
  }),
  additional: z.object({
    specialWishes: z.string().nullable().optional(),
    guestArrivalTime: z.string().nullable().optional(),
  }),
});

export type BookingSchema = z.infer<typeof bookingInterfaceSchema>;
export type BookingAPISchema = z.infer<typeof bookingAPISchema>;
