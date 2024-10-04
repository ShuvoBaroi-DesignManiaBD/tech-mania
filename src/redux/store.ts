
import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "./api/baseApi";
import exampleSlice from "./features/example/exampleSlice";
import themeSlice from "./features/theme/themeSlice";


export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    examples: exampleSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
