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
        onQueryStarted: async (arg, { getState, dispatch, queryFulfilled }) => {
          try {
            const rootState = getState();
            console.log(rootState);
            
            const { data } = await queryFulfilled; // Wait for the query to fulfill
            console.log("Data:", data);
            
            // Directly dispatch the data to Redux store
            // dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        },
        invalidatesTags: ["postInteractions"],
      }),
    addDownvote: builder.mutation<void,  Partial<TVote> >({
        query: ( data ) => ({
          url: `votes/add-downvote`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["postInteractions"],
      }),
    getPostVotes: builder.query<
      TResponse<TVote[]>,
      { postId: string }
    >({
      query: ({ postId}) => ({
        url: `/votes/get-post-votes/${postId}`,
        method: "GET",
      }),
      providesTags: ["postVotes"],
    }),

    getCommentVotes: builder.query<
      TResponse<TVote[]>,
      { commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `/votes/get-comment-votes/${commentId}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
  }),
});

export const {
    useAddUpvoteMutation,
    useAddDownvoteMutation,
    useGetPostVotesQuery,
    useGetCommentVotesQuery
} = voteApi;
