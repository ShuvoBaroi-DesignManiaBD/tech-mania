
import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "./api/baseApi";
import themeSlice from "./features/theme/themeSlice";
import deviceSlice from "./features/device/deviceSlice";
import offCanvasSlice from "./features/ui/offCanvas/offCanvasSlice";


export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    theme: themeSlice,
    device: deviceSlice,
    offCanvas: offCanvasSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
