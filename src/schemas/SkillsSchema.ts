import { z } from "zod";

/**
 * ✅ Offered Skill Validator
 */
export const offeredSkillSchema = z.object({
  name: z
    .string({ required_error: "Skill name is required" })
    .min(2, "Skill name must be at least 2 characters long"),

  proficiencyLevel: z.enum(["beginner", "intermediate", "expert"], {
    required_error: "Proficiency level is required",
  }),

  description: z
    .string()
    .max(300, "Description cannot exceed 300 characters")
    .optional(),

  categories: z.array(z.string().min(2, "Category name too short")).default([]),
});

/**
 * ✅ Required Skill Validator
 */
export const requiredSkillSchema = z.object({
  name: z
    .string({ required_error: "Skill name is required" })
    .min(2, "Skill name must be at least 2 characters long"),

  learningPriority: z.enum(["high", "medium", "low"], {
    required_error: "Learning priority is required",
  }),

  proficiencyLevel: z
    .enum(["beginner", "intermediate", "expert"])
    .default("beginner"),

  description: z
    .string()
    .max(300, "Description cannot exceed 300 characters")
    .optional(),

  categories: z.array(z.string().min(2, "Category name too short")).default([]),
});
