import { baseAPI } from "@/redux/api/baseApi";
import { setPosts } from "./postSlice";
import { IPost, TPostInteractions, TResponse } from "@/types";

const postApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<TResponse<IPost[]>, { page?: number; limit?: number, category: string | null, sort: string, searchTerm?: string | null}>({
      query: ({ page = 1, limit = 6, category = null, sort = "dsc", searchTerm=null }) => ({
        url: `/posts/all-posts?page=${page}&limit=${limit}${category ? `&category=${category}` : ""}&sort=createdAt:${sort === "Most Recent" ? "dsc" : "asc"}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`, // ?category=${category}}&sort=${sort}`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // Wait for the query to fulfill
          
          // Directly dispatch the data to Redux store
          dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      },
      providesTags: ["posts"],
    }),

    getPostsOfAUser: builder.query<TResponse<IPost[]>, { id: string, page?: number; limit?: number }>({
      query: ({ id: id, page = 1, limit = 6 }) => ({
        url: `/posts/user-posts/${id}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled; // Wait for the query to fulfill
      //     console.log("Data:", data);
          
      //     // Directly dispatch the data to Redux store
      //     dispatch(setPosts(data?.data)); // Assuming the API returns the array directly (not inside a `data` object)
      //   } catch (error) {
      //     console.error("Error fetching user posts:", error);
      //   }
      // },
      providesTags: ["userPosts"],
    }),

    getAPost: builder.query<IPost, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "GET",
      }),
    }),

    getAPostInteractions: builder.query<TResponse<TPostInteractions>, string>({
      query: (id) => ({
        url: `posts/post-interactions/${id}`,
        method: "GET",
      }),
      providesTags: ["postInteractions"],
    }),

    updateAPost: builder.mutation<
      void,
      { postId: string; updatedPost: Partial<IPost> }
    >({
      query: ({ postId, updatedPost }) => ({
        url: `posts/update-post-content/${postId}`,
        method: "PATCH",
        body: updatedPost,
      }),
      invalidatesTags: ["posts", "userPosts"], // This invalidates the cache of posts to refetch them after the update
    }),

    deleteAPost: builder.mutation<void, { id: string, userId: string }>({
      query: ({id,userId}) => ({
        url: `posts/delete-post?postId=${id}&userId=${userId}`,
        method: "PATCH",
        // body: userId
      }),
      invalidatesTags: ["posts", "userPosts"],
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
  useGetPostsOfAUserQuery,
  useGetAPostQuery,
  useGetAPostInteractionsQuery,
  useUpdateAPostMutation,
  useDeleteAPostMutation,
  useAddAPostMutation,
} = postApi;
