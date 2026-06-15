import { z } from "zod";
import { parseBirthDate } from "../utility/helpers";

const MIN_AGE = 16;
const MAX_AGE = 120;

export const signupValidationSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPassValidationSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const resetPassValidationSchema = z
  .object({
    password: z.string().min(6, "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordApiSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string(),
    resetToken: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePassValidationSchema = z
  .object({
    password: z.string().min(6, "Password is required"),
    newPassword: z.string().min(6, "Password is required"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword !== data.password, {
    message: "New password must be not the same as old",
    path: ["password"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const editUserInfoSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email")
      .or(z.literal(""))
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
    name: z
      .string()
      .min(2, "Name too short")
      .regex(/^[A-Za-zÀ-ÿ\s-]+$/, "Name can contain only letters")
      .or(z.literal(""))
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
    dateOfBirth: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .refine(
        (value) => {
          if (!value) return true;

          return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
            value,
          );
        },
        { message: "Invalid date format. Use DD/MM/YYYY" },
      )
      .refine(
        (value) => {
          if (!value) return true;

          return parseBirthDate(value) !== null;
        },
        { message: "Invalid date" },
      )
      .refine(
        (value) => {
          if (!value) return true;

          const date = parseBirthDate(value);
          if (!date) return false;

          const now = new Date();

          const minDate = new Date(
            Date.UTC(
              now.getUTCFullYear() - MAX_AGE,
              now.getUTCMonth(),
              now.getUTCDate(),
            ),
          );

          const maxDate = new Date(
            Date.UTC(
              now.getUTCFullYear() - MIN_AGE,
              now.getUTCMonth(),
              now.getUTCDate(),
            ),
          );

          return date >= minDate && date <= maxDate;
        },
        { message: `Age must be between ${MIN_AGE} and ${MAX_AGE}` },
      )
      .optional(),
    phoneNumber: z
      .string()
      .regex(/^\+1 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number")
      .or(z.literal(""))
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  })
  .refine(
    (data) =>
      !!(data.email || data.name || data.dateOfBirth || data.phoneNumber),
    {
      message: "At least one field must be filled",
      path: ["root"],
    },
  );

export type SignupSchema = z.infer<typeof signupValidationSchema>;
export type LoginSchema = z.infer<typeof loginValidationSchema>;
export type ChangePasswordSchema = z.infer<typeof changePassValidationSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPassValidationSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPassValidationSchema>;
export type ResetPasswordApiSchema = z.infer<typeof resetPasswordApiSchema>;
export type EditUserInfoSchema = z.infer<typeof editUserInfoSchema>;
