import { showMessage } from "@/components/ui/message";
import envConfig from "@/config/envConfig";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { IResError } from "@/types";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('accessToken', `${token}`);
      }
  
      return headers;
    },
})

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle different status errors
  if (result?.error) {
    const status = result.error.status;
    if (status === 404 || status === 403) {
      showMessage({type:'error', message: 'An error occurred.'});
    } else if (status === 401) {
      //* Send Refresh Token Request

      try {
        const res = await fetch(`${envConfig.baseApi}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        
        if (data?.data?.accessToken) {
          const user = (api.getState() as RootState).auth.user;

          // Update the token in state
          api.dispatch(
            setUser({
              user,
              token: data.data.accessToken,
            })
          );

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
          return result;
        } else {
          showMessage({type:'error', message:'Failed to refresh token. Logging out...'});
          api.dispatch(logout());
        }
      } catch (error) {
        showMessage({type:'error', message: (error as IResError).message ||'Error refreshing token. Logging out...'});
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['user','auth','currentUser','posts', 'comments', 'replies','allUsers', 'suggestedUsers','userPosts', 'votes', 'upvotes', 'downvotes', 'postVotes', 'postInteractions', 'commentVotes'],
  endpoints: () => ({}),
});