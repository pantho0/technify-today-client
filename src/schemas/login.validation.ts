import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email Required" }).email({
    message: "Invalid Email",
  }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, "Password must be at least 6 characters long"),
});
