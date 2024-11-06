'use client';
import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "./api/baseApi";
import themeSlice from "./features/theme/themeSlice";
import deviceSlice from "./features/device/deviceSlice";
import offCanvasSlice from "./features/ui/offCanvas/offCanvasSlice";
import authSlice from "./features/auth/authSlice";
import postsSlice from "./features/posts/postSlice";
import subscriptionSlice from "./features/subscription/subscriptionSlice";
import checkoutModalSlice from "./features/ui/checkoutModal/checkoutModalSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    theme: themeSlice,
    device: deviceSlice,
    offCanvas: offCanvasSlice,
    auth: persistedAuthReducer,
    posts: postsSlice,
    subscription: subscriptionSlice,
    checkoutModal: checkoutModalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
});

// Infer the type of the store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Persistor instance
export const persistor = persistStore(store);
