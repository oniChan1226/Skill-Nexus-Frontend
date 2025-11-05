import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserModal } from "../types/user.types";
import type { ApiResponse } from "../types/services.types";
import { baseQueryWithReauth } from ".";
import { authApi } from "./auth.service";

interface UserResponse extends ApiResponse {
  user: UserModal;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserResponse, UserModal>({
      query: (newUser) => ({
        url: `/user/update`,
        method: "PUT",
        body: newUser,
      }),
      invalidatesTags: ["UserProfile"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          
          // ✅ Method 1: Invalidate the auth API's User tag
          dispatch(authApi.util.invalidateTags(["User"]));
          
          // ✅ Method 2: Manually refetch the getCurrentUser query
          dispatch(authApi.endpoints.getCurrentUser.initiate(undefined, { 
            forceRefetch: true 
          }));
        } catch (error) {
          console.error("❌ Failed to update profile:", error);
        }
      },
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
