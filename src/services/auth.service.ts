import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserModal } from "../types/user.types";
import type { ApiResponse } from "../types/services.types";
import type { LoginFormData, SignupFormData } from "../types/auth.types";
import { baseQueryWithReauth } from ".";

type AuthUserResponse = ApiResponse<{ user: UserModal }>;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthUserResponse, SignupFormData>({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<AuthUserResponse, LoginFormData>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    getCurrentUser: builder.query<AuthUserResponse, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      })
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetCurrentUserQuery, useLogoutUserMutation } = authApi;
