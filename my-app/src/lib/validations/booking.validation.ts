import z from "zod";

export const bookingInterfaceSchema = z.object({
  name: z.string().min(1, "Must be at least 2 characters"),
  surname: z.string().min(1, "Must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  city: z.string().min(1, "Must be at least 2 characters"),
  address: z.string().min(1, "Must be at least 2 characters"),
  region: z.string().optional(),
  country: z.string().min(1, "Must be at least 2 characters"),
  specialWishes: z.string().optional(),
  guestArrivalTime: z.string().optional(),
});

export const bookingAPISchema = z.object({
  tourId: z.number(),
  customerInfo: {
    name: z.string().min(1, "Must be at least 2 characters"),
    surname: z.string().min(1, "Must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string(),
  },
  contactDetails: {
    city: z.string().min(1, "Must be at least 2 characters"),
    address: z.string().min(1, "Must be at least 2 characters"),
    region: z.string().min(1, "Must be at least 2 characters"),
    country: z.string().min(1, "Must be at least 2 characters"),
  },
  additional: {
    specialWishes: z.string().optional(),
    guestArrivalTime: z.string().optional(),
  },
});

export type BookingSchema = z.infer<typeof bookingInterfaceSchema>;
export type BookingAPISchema = z.infer<typeof bookingAPISchema>;
