import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { themes } from '@/constant';
 

interface themeState {
  theme: string; // Add a property for filtered theme
}

const initialState: themeState = {
  theme: themes.light,  // Initialize as null
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = state.theme === "light"? "dark": "light";
    }
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const selectCurrentTheme = (state: RootState) => state?.theme?.theme;
