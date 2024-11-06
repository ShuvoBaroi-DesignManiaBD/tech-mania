import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const checkoutModalSlice = createSlice({
  name: "checkoutModal",
  initialState,
  reducers: {
    showCheckoutModal: (state) => {
      return (state = !state);
    },
  },
});

export const { showCheckoutModal } = checkoutModalSlice.actions;
export default checkoutModalSlice.reducer;
export const selectIsShowCheckoutModal = (state: RootState) => state.offCanvas;
