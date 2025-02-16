import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email Required" }).email({
    message: "Invalid Email",
  }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
  firstName: z
    .string({ required_error: "First Name Required" })
    .min(1, "First Name Required"),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: "Last Name Required" })
    .min(1, "Last Name Required"),
  email: z.string({ required_error: "Email Required" }).email({
    message: "Invalid Email",
  }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, "Password must be at least 6 characters long"),
});
