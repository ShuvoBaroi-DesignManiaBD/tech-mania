// import { baseAPI } from "@/redux/api/baseApi";
// import { TResponse } from "@/types";
// import { TVote } from "@/types/vote.type";

// const statisticsApi = baseAPI.injectEndpoints({
//   endpoints: (builder) => ({
//     addUpvote: builder.mutation<void, Partial<TVote>>({
//         query: ( data ) => ({
//           url: `votes/add-upvote`,
//           method: "POST",
//           body: data,
//         }),
//         invalidatesTags: ["posts"],
//       }),
//     addDownvote: builder.mutation<void, { data: Partial<TVote> }>({
//         query: ({ data }) => ({
//           url: `votes/add-downvote`,
//           method: "POST",
//           body: data,
//         }),
//         invalidatesTags: ["posts"],
//       }),

//     getPostStatistics: builder.query<
//       TResponse<TVote[]>,
//       { postId: string }
//     >({
//       query: ({ postId}) => ({
//         url: `/votes/get-post-votes/${postId}`,
//         method: "GET",
//       }),
//       providesTags: ["postVotes"],
//     }),

//     getCommentVotes: builder.query<
//       TResponse<TVote[]>,
//       { commentId: string }
//     >({
//       query: ({ commentId }) => ({
//         url: `/votes/get-comment-votes/${commentId}`,
//         method: "GET",
//       }),
//       providesTags: ["comments"],
//     }),
//   }),
// });

// export const {
//     useAddUpvoteMutation,
//     useAddDownvoteMutation,
//     useGetPostVotesQuery,
//     useGetCommentVotesQuery
// } = statisticsApi;
