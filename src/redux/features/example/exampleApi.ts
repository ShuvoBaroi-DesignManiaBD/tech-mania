import { baseAPI } from "@/redux/api/baseApi";

const orderApi = baseAPI.injectEndpoints({
  endpoints: (builder) => (
    {
    postExample: builder.mutation<void, void>({
      query: (data)=>({
        url: `/orders/create-order`,
        method: "POST",
        // headers:(accessToken && {accesstoken: accessToken}) || {refreshToken: refreshToken}||{},
        body: data
      }),
    }),
    getExample: builder.query<any, any>({
      query: ({ userId,page = 1, limit = 5 })=>({
        url: `/orders/my-orders?userId=${userId}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }
)
});

export const { usePostExampleMutation, useGetExampleQuery} = orderApi;