import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDeviceType: (state) => {
      return (state = !state);
    },
  },
});

export const { setDeviceType } = deviceSlice.actions;
export default deviceSlice.reducer;
export const selectCurrentDevice = (state: RootState) => state.device;
