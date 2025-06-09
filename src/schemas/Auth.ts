import { z } from "zod";

export const loginSchema = z.object({
  credential: z.string().min(1, "Email or username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[@$!%*?&#]/, "Must include one special character"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(12, "You must be at least 12 years old")
    .max(100, "Please enter a valid age"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or fewer")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[@$!%*?&#]/, "Must include one special character"),
  agreement: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});
