import { baseAPI } from "@/redux/api/baseApi";
import { TResponse, TSignInData } from "@/types";

const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TResponse<TSignInData>, TSignInData>({
      query: (data) => ({
        url: `/auth/signin`,
        method: "POST",
        body: data,
      })
    }),
    
}),
});

export const {
  useLoginMutation,
} = authApi;
