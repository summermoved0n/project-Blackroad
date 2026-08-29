import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (value) =>
        value.startsWith("postgresql://") || value.startsWith("postgres://"),
      "DATABASE_URL must be a PostgreSQL connection URL",
    ),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must contain at least 32 characters"),
  STRIPE_SECRET_KEY: z.string().regex(/^sk_(test|live)_/, "Invalid Stripe secret key"),
  STRIPE_WEBHOOK_SECRET: z.string().regex(/^whsec_/, "Invalid Stripe webhook secret"),
  RESEND_API_KEY: z.string().regex(/^re_/, "Invalid Resend API key"),
  RESEND_EMAIL_FROM: z
    .string()
    .min(3)
    .refine((value) => value.includes("@"), "Invalid sender email"),
  BASE_URL: z
    .string()
    .url()
    .transform((value) => value.replace(/\/$/, "")),
});

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(
    `Invalid server environment configuration: ${z.prettifyError(result.error)}`,
  );
}

export const serverEnv = result.data;
