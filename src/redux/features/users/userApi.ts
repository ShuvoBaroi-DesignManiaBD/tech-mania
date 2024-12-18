// "use client";
import { baseAPI } from "@/redux/api/baseApi";
import { IPost, IRegisterData, IUser, TPaymentInfo, TResponse } from "@/types";
import { setUserData } from "../auth/authSlice";
import { setSubscriptionPlan } from "../subscription/subscriptionSlice";

export const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<TResponse<IPost[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 6 }) => ({
        url: `/users/all-users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),
    getSuggestedUsers: builder.query<TResponse<IUser[]>, { id: string, page?: number; limit?: number }>({
      query: ({ id, page = 1, limit = 12 }) => ({
        url: `/users/suggested-users?id=${id}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["suggestedUsers"],
    }),

    getCurrentUser: builder.query<{ data: IUser }, string>({
      query: (id) => ({
        url: `users/current-user/${id}`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const {data} = await queryFulfilled; // Wait for the query to fulfill
          // console.log("Data:", data);
          const verified = data.data.verified === true ? "Premium" : "Free";
          // Dispatch the data directly to Redux store without an arrow function wrapper
          dispatch(setUserData(data.data)); // Assuming `data.data` is IUser
          dispatch(setSubscriptionPlan(verified));
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      },
      providesTags: ["currentUser"],
    }),
    
    getAUser: builder.query<{data:IUser}, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
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
      invalidatesTags: ["posts", "allUsers", "currentUser"], // This invalidates the cache of posts to refetch them after the update
    }),

    updateAUserProfile: builder.mutation<
      void,
      { userId: string; updatedData: Partial<IUser> }
    >({
      query: ({ userId, updatedData }) => ({
        url: `users/update-user-profile/${userId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["currentUser", "user"], // This invalidates the cache of posts to refetch them after the update
    }),

    verifyAUser: builder.mutation<
      void,
      { userId: string; updatedData: Partial<TPaymentInfo> }
    >({
      query: ({ userId, updatedData }) => ({
        url: `users/verify-user/${userId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["currentUser", "user"], // This invalidates the cache of posts to refetch them after the update
    }),

    followAUser: builder.mutation<
      void,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `users/follow-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["currentUser"], // This invalidates the cache of posts to refetch them after the update
    }),

    unFollowAUser: builder.mutation<
      void,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `users/unfollow-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["currentUser"], // This invalidates the cache of posts to refetch them after the update
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

    registerUser: builder.mutation<TResponse<IRegisterData>, IRegisterData>({
      query: (data) => ({
        url: `/users/create-user`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAUserMutation,
  useRegisterUserMutation,
  useGetAUserQuery,
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
  useGetSuggestedUsersQuery,
  useDeleteAUserMutation,
  useUpdateAUserMutation,
  useVerifyAUserMutation,
  useUpdateAUserProfileMutation,
  useFollowAUserMutation,
  useUnFollowAUserMutation
} = userApi;
