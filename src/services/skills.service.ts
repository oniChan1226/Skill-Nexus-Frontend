import { createApi } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/services.types";
import { baseQueryWithReauth } from ".";
import type { OfferedSkill, RequiredSkill } from "@/schemas/SkillsSchema";

// Backend Skill Model (from MongoDB)
export interface SkillModel {
  _id: string;
  name: string;
  proficiencyLevel?: "beginner" | "intermediate" | "expert";
  learningPriority?: "high" | "medium" | "low";
  description?: string;
  categories?: string[];
  metrics?: {
    totalRequests?: number;
    acceptedRequests?: number;
    completedRequests?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface SkillResponse extends ApiResponse {
  skill: SkillModel;
}

interface SkillsListResponse extends ApiResponse {
  skills: SkillModel[];
  data?: {
    offeredSkills?: SkillModel[];
    requiredSkills?: SkillModel[];
  };
  offeredSkills?: SkillModel[];
  requiredSkills?: SkillModel[];
}

export const skillsApi = createApi({
  reducerPath: "skillsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Skills"],
  endpoints: (builder) => ({
    // GET my offered skills
    getMyOfferedSkills: builder.query<SkillsListResponse, void>({
      query: () => ({
        url: `/skills/my-offered-skill`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // Handle different possible response structures
        if (response.skills) {
          return response;
        }
        if (response.data?.offeredSkills) {
          return { ...response, skills: response.data.offeredSkills };
        }
        if (response.offeredSkills) {
          return { ...response, skills: response.offeredSkills };
        }
        if (response.data) {
          return { ...response, skills: response.data };
        }
        return { ...response, skills: [] };
      },
      providesTags: ["Skills"],
    }),
    // GET my required skills - Note: Your backend route uses POST instead of GET
    getMyRequiredSkills: builder.query<SkillsListResponse, void>({
      query: () => ({
        url: `/skills/my-required-skill`,
        method: "POST",
      }),
      transformResponse: (response: any) => {
        // Handle different possible response structures
        if (response.skills) {
          return response;
        }
        if (response.data?.requiredSkills) {
          return { ...response, skills: response.data.requiredSkills };
        }
        if (response.requiredSkills) {
          return { ...response, skills: response.requiredSkills };
        }
        if (response.data) {
          return { ...response, skills: response.data };
        }
        return { ...response, skills: [] };
      },
      providesTags: ["Skills"],
    }),
    // POST add offered skill
    addOfferedSkill: builder.mutation<SkillResponse, OfferedSkill>({
      query: (skillData) => ({
        url: `/skills/add-offered-skill`,
        method: "POST",
        body: skillData,
      }),
      invalidatesTags: ["Skills"],
    }),
    // POST add required skill
    addRequiredSkill: builder.mutation<SkillResponse, RequiredSkill>({
      query: (skillData) => ({
        url: `/skills/add-required-skill`,
        method: "POST",
        body: skillData,
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetMyOfferedSkillsQuery,
  useGetMyRequiredSkillsQuery,
  useAddOfferedSkillMutation,
  useAddRequiredSkillMutation,
} = skillsApi;
