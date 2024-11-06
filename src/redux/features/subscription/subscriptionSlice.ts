// src/redux/features/subscription/subscriptionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  currentPlan: "Free" | "Premium";
  isPremium: boolean;
}

const initialState: SubscriptionState = {
  currentPlan: "Free",
  isPremium: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionPlan: (state, action: PayloadAction<"Free" | "Premium">) => {
      state.currentPlan = action.payload;
      state.isPremium = action.payload === "Premium";
    },
  },
});

export const { setSubscriptionPlan } = subscriptionSlice.actions;

export const selectCurrentPlan = (state: { subscription: SubscriptionState }) =>
  state.subscription.currentPlan;

export const selectIsPremium = (state: { subscription: SubscriptionState }) =>
  state.subscription.isPremium;

export default subscriptionSlice.reducer;
