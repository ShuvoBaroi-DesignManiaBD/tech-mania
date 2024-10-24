import { baseAPI } from "@/redux/api/baseApi";
import { setPosts } from "./postSlice";
import { IPost, TResponse } from "@/types";

const postApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<TResponse<IPost[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 6 }) => ({
        url: `/posts/all-posts?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // Wait for the query to fulfill
          console.log("Data:", data);
          
          // Directly dispatch the data to Redux store
          dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      },
      providesTags: ["posts"],
    }),

    getAPost: builder.query<IPost, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "GET",
      }),
    }),

    updateAPost: builder.mutation<
      void,
      { postId: string; updatedPost: Partial<IPost> }
    >({
      query: ({ postId, updatedPost }) => ({
        url: `posts/update-post?postId=${postId}`,
        method: "PATCH",
        body: updatedPost,
      }),
      invalidatesTags: ["posts"], // This invalidates the cache of posts to refetch them after the update
    }),

    deleteAPost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),

    addAPost: builder.mutation<void, { data: Partial<IPost> }>({
      query: ({ data }) => ({
        url: `posts/create-post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetAPostQuery,
  useUpdateAPostMutation,
  useDeleteAPostMutation,
  useAddAPostMutation,
} = postApi;
