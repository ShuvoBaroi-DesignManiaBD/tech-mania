import { baseAPI } from "@/redux/api/baseApi";
import { TResponse } from "@/types";
import { TVote } from "@/types/vote.type";

const voteApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addUpvote: builder.mutation<void, Partial<TVote>>({
        query: ( data ) => ({
          url: `votes/add-upvote`,
          method: "POST",
          body: data,
        }),
        // onQueryStarted: async (arg, { getState, queryFulfilled }) => {
        //   try {
        //     const rootState = getState();

        //     const { data } = await queryFulfilled; // Wait for the query to fulfill
            
        //     // Directly dispatch the data to Redux store
        //     // dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
        //   } catch (error) {
        //     console.error("Error fetching posts:", error);
        //   }
        // },
        invalidatesTags: ["postInteractions", "replies", "commentVotes", "comments"],
      }),
    addDownvote: builder.mutation<void,  Partial<TVote> >({
        query: ( data ) => ({
          url: `votes/add-downvote`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["postInteractions", "replies", "commentVotes", "comments"],
      }),
    getPostVotes: builder.query<
      TResponse<TVote[]>,
      { postId: string }
    >({
      query: ({ postId}) => ({
        url: `/votes/get-post-votes/${postId}`,
        method: "GET",
      }),
      providesTags: ["postVotes", "replies"],
    }),

    getCommentVotes: builder.query<
      TResponse<TVote[]>,
      { commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `/votes/get-comment-votes/${commentId}`,
        method: "GET",
      }),
      providesTags: ["commentVotes"],
    }),
  }),
});

export const {
    useAddUpvoteMutation,
    useAddDownvoteMutation,
    useGetPostVotesQuery,
    useGetCommentVotesQuery
} = voteApi;
