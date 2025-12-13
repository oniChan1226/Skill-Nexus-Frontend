import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/auth.service";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/ui/themeSlice";
import { userApi } from "@/services/user.service";
import { skillsApi } from "@/services/skills.service";
import { tradingApi } from "@/services/trading.service";
import { tradeRequestApi } from "@/services/tradeRequest.service";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [tradingApi.reducerPath]: tradingApi.reducer,
    [tradeRequestApi.reducerPath]: tradeRequestApi.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      skillsApi.middleware,
      tradingApi.middleware,
      tradeRequestApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
