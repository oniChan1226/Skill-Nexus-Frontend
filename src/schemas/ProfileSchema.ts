// profileSchema.ts
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Enter a valid age",
  }),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  portfolio: z.string().optional(),
  profession: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
