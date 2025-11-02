import { z } from "zod";

/**
 * ✅ Offered Skill Validator - Matches Backend Schema
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
    .optional()
    .or(z.literal("")),

  categories: z
    .array(z.string())
    .min(1, "At least one category is required")
    .optional(),
});

export type OfferedSkill = z.infer<typeof offeredSkillSchema>;

/**
 * ✅ Required Skill Validator - Matches Backend Schema
 */
export const requiredSkillSchema = z.object({
  name: z
    .string({ required_error: "Skill name is required" })
    .min(2, "Skill name must be at least 2 characters long"),

  learningPriority: z.enum(["high", "medium", "low"], {
    required_error: "Learning priority is required",
  }),

  description: z
    .string()
    .max(300, "Description cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),

  categories: z
    .array(z.string())
    .min(1, "At least one category is required")
    .optional(),
});

export type RequiredSkill = z.infer<typeof requiredSkillSchema>;
