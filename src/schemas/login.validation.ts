import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email Required" }).email({
    message: "Invalid Email",
  }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, "Password must be at least 6 characters long"),
});

export const updatePostSchema = z.object({
  title: z
    .string({ required_error: "Title Required" })
    .min(1, "Title Required"),
  category: z
    .string({ required_error: "Category Required" })
    .min(1, "Category Required"),
  isPremium: z.string({ required_error: "Is Premium Required" }),
  content: z
    .string({ required_error: "Content Required" })
    .min(1, "Content Required"),
  image: z
    .string({ required_error: "Image Required" })
    .min(1, "Image Required"),
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
