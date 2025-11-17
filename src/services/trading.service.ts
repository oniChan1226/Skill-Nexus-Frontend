import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from ".";
import type { SingleUserResponse, UsersForTradingResponse } from "@/types/trading.types";

export const tradingApi = createApi({
  reducerPath: "tradingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["TradingUsers"],
  endpoints: (builder) => ({
    getUsersForTrading: builder.query<
      UsersForTradingResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/skills/users-for-trading`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["TradingUsers"],
    }),
    getUserForTradingById: builder.query<SingleUserResponse, string>({
      query: (userId) => ({
        url: `/skills/users-for-trading/${userId}`,
        method: "GET",
      }),
      providesTags: ["TradingUsers"],
    }),
  }),
});

export const { useGetUsersForTradingQuery, useGetUserForTradingByIdQuery } =
  tradingApi;
