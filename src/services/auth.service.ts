import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserModal } from "../types/user.types";
import type { ApiResponse } from "../types/services.types";
import type { LoginFormData, SignupFormData } from "../types/auth.types";
import { baseQueryWithReauth } from ".";

interface AuthUserResponse extends ApiResponse {
  user: UserModal;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"], // 👈 define your tag
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthUserResponse, SignupFormData>({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"], // 👈 ensure re-fetch after registration
    }),
    loginUser: builder.mutation<AuthUserResponse, LoginFormData>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"], // 👈 ensure re-fetch after login
    }),
    getCurrentUser: builder.query<AuthUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"], // 👈 provides cache for invalidation
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"], // 👈 clear user cache on logout
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = authApi;
