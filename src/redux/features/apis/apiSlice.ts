import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
// if (!BASE_URL) {
//   console.error("NEXT_PUBLIC_SERVER_URL is not set properly!");
// }

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000" 
    }),endpoints:(builder)=>({}),
})

export const {}= apiSlice;