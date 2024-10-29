import { baseAPI } from "@/redux/api/baseApi";
import { IComment, IPost, TComment, TResponse } from "@/types";

const commentApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommentsOfAPost: builder.query<
      TResponse<TComment[]>,
      { postId: string; page?: number; limit?: number }
    >({
      query: ({ postId, page = 1, limit = 6 }) => ({
        url: `/comments/post/${postId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled; // Wait for the query to fulfill
      //     console.log("Data:", data);

      //     // Directly dispatch the data to Redux store
      //     dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
      //   } catch (error) {
      //     console.error("Error fetching posts:", error);
      //   }
      // },
      providesTags: ["comments"],
    }),

    getAllRepliesOfAComment: builder.query<
      TResponse<TComment[]>,
      { parentCommentId: string; page?: number; limit?: number }
    >({
      query: ({ parentCommentId, page = 1, limit = 6 }) => ({
        url: `comments/comment-replies/${parentCommentId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled; // Wait for the query to fulfill
      //     console.log("Data:", data);

      //     // Directly dispatch the data to Redux store
      //     dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
      //   } catch (error) {
      //     console.error("Error fetching posts:", error);
      //   }
      // },
      providesTags: ["comments"],
    }),

    getAComment: builder.query<IPost, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "GET",
      }),
    }),

    updateAComment: builder.mutation<
      void,
      { commentId: string; updatedComment: Partial<IComment> }
    >({
      query: ({ commentId, updatedComment }) => ({
        url: `comments/comment/id=${commentId}`,
        method: "PATCH",
        body: updatedComment,
      }),
      invalidatesTags: ["comments"], // This invalidates the cache of posts to refetch them after the update
    }),

    deleteAComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),

    addAComment: builder.mutation<void, Partial<IComment>>({
      query: ( data ) => ({
        url: `comments/create-comment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments", "postInteractions"],
    }),
  }),
});

export const {
  useGetAllCommentsOfAPostQuery,
  useGetAllRepliesOfACommentQuery,
  useGetACommentQuery,
  useAddACommentMutation,
  useDeleteACommentMutation,
  useUpdateACommentMutation,
} = commentApi;
