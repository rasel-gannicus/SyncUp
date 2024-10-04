import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.NEXT_PUBLIC_BACKENED_URL
    baseUrl: "http://localhost:2500/api/v1",
  }),
  tagTypes: ['userInfo'],
  endpoints: (builder) => ({}),
});
