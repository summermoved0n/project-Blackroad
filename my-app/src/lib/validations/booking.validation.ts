import z from "zod";
import { RoomType } from "../../../generated/prisma/enums";

export const bookingInterfaceSchema = z.object({
  name: z.string().min(1, "Must be at least 2 characters"),
  surname: z.string().min(1, "Must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  city: z.string().min(2, "Must be at least 2 characters"),
  address: z.string().min(2, "Must be at least 2 characters"),
  // departureId: z.number(),
  // room: z.enum(RoomType, {
  //   message: "Room must be either 'single' or 'double'",
  // }),
  // adults: z
  //   .number()
  //   .min(1, "Must be selected at least 1 tenant")
  //   .max(10, "Max tenants for one booking is 10"),
  // children: z.number().min(0).max(10, "Max children for one booking is 10"),
  // numberOfRooms: z
  //   .number()
  //   .min(1, "Must be selected at least 1 room")
  //   .max(10, "Total rooms for one booking is 10"),
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
  departureData: z.object({
    departureId: z.number(),
    room: z.enum(RoomType, {
      message: "Room must be either 'single' or 'double'",
    }),
    adults: z
      .number()
      .min(1, "Must be selected at least 1 tenant")
      .max(10, "Max tenants for one booking is 10"),
    children: z.number().min(0).max(10, "Max children for one booking is 10"),
    numberOfRooms: z
      .number()
      .min(1, "Must be selected at least 1 room")
      .max(10, "Total rooms for one booking is 10"),
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

export const cancelBookingSchema = z.object({
  bookingId: z.coerce.number().int().positive(),
});

export const createReviewSchema = z.object({
  bookingId: z.number().int().positive(),

  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review is too long"),

  rating: z.number().int().min(1, "Please select a rating").max(5),
});

export type BookingSchema = z.infer<typeof bookingInterfaceSchema>;
export type BookingAPISchema = z.infer<typeof bookingAPISchema>;
export type CancelBookingSchema = z.infer<typeof cancelBookingSchema>;
export type CreateReviewSchema = z.infer<typeof createReviewSchema>;
