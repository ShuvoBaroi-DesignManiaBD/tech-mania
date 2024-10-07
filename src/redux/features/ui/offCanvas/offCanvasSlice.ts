import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const offCanvasSlice = createSlice({
  name: "offCanvas",
  initialState,
  reducers: {
    setOffCanvasState: (state) => {
      return (state = !state);
    },
  },
});

export const { setOffCanvasState } = offCanvasSlice.actions;
export default offCanvasSlice.reducer;
export const selectOffCanvasState = (state: RootState) => state.offCanvas;
