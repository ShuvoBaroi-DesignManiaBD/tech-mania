import envConfig from "@/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    credentials: "include",
})


export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});