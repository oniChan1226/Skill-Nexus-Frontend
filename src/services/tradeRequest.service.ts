import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from ".";
import type {
  CreateTradeRequestPayload,
  UpdateTradeStatusPayload,
  TradeRequestResponse,
  TradeRequestsResponse,
} from "@/types/tradeRequest.types";

/**
 * TRADE REQUEST API SERVICE
 * 
 * Handles all skill barter/trade request operations:
 * - Create trade requests
 * - Get sent/received requests
 * - Update request status (accept/reject/complete)
 * 
 * Backend routes: /api/v1/trades/*
 */
export const tradeRequestApi = createApi({
  reducerPath: "tradeRequestApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["TradeRequests", "SentRequests", "ReceivedRequests"],
  endpoints: (builder) => ({
    /**
     * CREATE TRADE REQUEST
     * POST /api/trades
     * 
     * Creates a new barter request between two users
     */
    createTradeRequest: builder.mutation<
      TradeRequestResponse,
      CreateTradeRequestPayload
    >({
      query: (payload) => ({
        url: "/trade-skills",
        method: "POST",
        body: payload,
      }),
      // Invalidate both sent and received lists to refresh data
      invalidatesTags: ["SentRequests", "ReceivedRequests"],
      async onQueryStarted(_payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("✅ Trade request created successfully");
        } catch (error) {
          console.error("❌ Failed to create trade request:", error);
        }
      },
    }),

    /**
     * GET SENT TRADE REQUESTS
     * GET /api/trades/sent
     * 
     * Retrieves all trade requests the current user has sent
     */
    getSentTradeRequests: builder.query<TradeRequestsResponse, void>({
      query: () => ({
        url: "/trade-skills/sent",
        method: "GET",
      }),
      providesTags: ["SentRequests"],
    }),

    /**
     * GET RECEIVED TRADE REQUESTS
     * GET /api/trades/received
     * 
     * Retrieves all trade requests the current user has received
     */
    getReceivedTradeRequests: builder.query<TradeRequestsResponse, void>({
      query: () => ({
        url: "/trade-skills/received",
        method: "GET",
      }),
      providesTags: ["ReceivedRequests"],
    }),

    /**
     * UPDATE TRADE STATUS
     * PATCH /api/trades/:id/status
     * 
     * Updates the status of a trade request (accept/reject/complete)
     */
    updateTradeStatus: builder.mutation<
      TradeRequestResponse,
      { tradeId: string; status: UpdateTradeStatusPayload["status"] }
    >({
      query: ({ tradeId, status }) => ({
        url: `/trade-skills/${tradeId}/status`,
        method: "PATCH",
        body: { status },
      }),
      // Invalidate both lists since status changes affect both views
      invalidatesTags: ["SentRequests", "ReceivedRequests"],
      async onQueryStarted({ status }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log(`✅ Trade request ${status} successfully`);
        } catch (error) {
          console.error("❌ Failed to update trade status:", error);
        }
      },
    }),
  }),
});

export const {
  useCreateTradeRequestMutation,
  useGetSentTradeRequestsQuery,
  useGetReceivedTradeRequestsQuery,
  useUpdateTradeStatusMutation,
} = tradeRequestApi;
