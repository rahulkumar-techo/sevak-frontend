"use client"
import { apiSlice } from "@/redux/features/apis/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth/authSlice";
import jobReducer from "@/redux/features/job/jobSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    job:jobReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // devTools:false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
