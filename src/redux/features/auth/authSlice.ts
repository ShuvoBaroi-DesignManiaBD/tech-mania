'use client';
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";
import { RootState } from "@/redux/store";
export type TAuthState = {
  user: null | IUser;
  userData: null | IUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  userData: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setUserData, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserData = (state: RootState) => state.auth.userData;
