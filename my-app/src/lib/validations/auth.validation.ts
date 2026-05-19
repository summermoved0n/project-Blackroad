import { z } from "zod";

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

export type SignupSchema = z.infer<typeof signupValidationSchema>;
export type LoginSchema = z.infer<typeof loginValidationSchema>;
export type ChangePasswordSchema = z.infer<typeof changePassValidationSchema>;
