import { baseAPI } from "@/redux/api/baseApi";

const statisticsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => (
    {
    getAllStatistics: builder.query<{data: unknown}, unknown>({
      query: ()=>({
        url: `/statistics/for-admin`,
        method: "GET",
      }),
    }),
  }
)
});

export const { useGetAllStatisticsQuery} = statisticsApi;