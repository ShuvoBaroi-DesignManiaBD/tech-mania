import { baseAPI } from "@/redux/api/baseApi";
import { IPost, IUser, TResponse } from "@/types";
import { setPosts } from "../posts/postSlice";

const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<TResponse<IPost[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 6 }) => ({
        url: `/users/all-users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),
    getSuggestedUsers: builder.query<TResponse<IUser[]>, { id: string, page?: number; limit?: number }>({
      query: ({ id, page = 1, limit = 6 }) => ({
        url: `/users/suggested-users?id=${id}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["suggestedUsers"],
    }),

    getAUser: builder.query<{data:IUser}, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),

    updateAUser: builder.mutation<
      void,
      { postId: string; updatedPost: Partial<IPost> }
    >({
      query: ({ postId, updatedPost }) => ({
        url: `users/update-user?postId=${postId}`,
        method: "PATCH",
        body: updatedPost,
      }),
      invalidatesTags: ["posts"], // This invalidates the cache of posts to refetch them after the update
    }),

    followAUser: builder.mutation<
      void,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `users/follow-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["suggestedUsers", 'user'], // This invalidates the cache of posts to refetch them after the update
    }),

    deleteAUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),

    addAUser: builder.mutation<void, { data: Partial<IPost> }>({
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
  useAddAUserMutation,
  useGetAUserQuery,
  useGetAllUsersQuery,
  useGetSuggestedUsersQuery,
  useDeleteAUserMutation,
  useUpdateAUserMutation,
  useFollowAUserMutation,
} = userApi;
