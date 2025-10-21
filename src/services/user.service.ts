import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserModal } from "../types/user.types";
import type { ApiResponse } from "../types/services.types";
import { baseQueryWithReauth } from ".";

interface UserResponse extends ApiResponse {
  user: UserModal;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserResponse, UserModal>({
      query: (newUser) => ({
        url: `/user/update`,
        method: "PUT",
        body: newUser,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
