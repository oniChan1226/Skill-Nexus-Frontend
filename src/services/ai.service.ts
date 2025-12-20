import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./index";
import type { AIRecommendationsResponse, ProfileAnalysisResponse, FindTeachersResponse, SkillSimilarityRequest, SkillSimilarityResponse, LearningPathRequest, LearningPathResponse } from "@/types/ai.types";

export const aiService = createApi({
  reducerPath: "aiService",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AIRecommendations", "ProfileAnalysis", "Teachers"],
  endpoints: (builder) => ({
    getSkillRecommendations: builder.query<AIRecommendationsResponse, void>({
      query: () => "ai/skill-recommendations",
      providesTags: ["AIRecommendations"],
    }),
    getProfileAnalysis: builder.query<ProfileAnalysisResponse, void>({
      query: () => "ai/profile-analysis",
      providesTags: ["ProfileAnalysis"],
    }),
    findTeachers: builder.query<FindTeachersResponse, string>({
      query: (skillName) => `ai/find-teachers/${skillName}`,
      providesTags: ["Teachers"],
    }),
    calculateSkillSimilarity: builder.mutation<SkillSimilarityResponse, SkillSimilarityRequest>({
      query: (body) => ({
        url: "ai/custom/skill-similarity",
        method: "POST",
        body,
      }),
    }),
    getLearningPath: builder.mutation<LearningPathResponse, LearningPathRequest>({
      query: (body) => ({
        url: "ai/custom/learning-path",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetSkillRecommendationsQuery, useGetProfileAnalysisQuery, useLazyFindTeachersQuery, useCalculateSkillSimilarityMutation, useGetLearningPathMutation } = aiService;
