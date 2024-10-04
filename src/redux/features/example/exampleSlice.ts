import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
 

interface ExampleState {
  examples: []; // Add a property for filtered products
}

const initialState: ExampleState = {
  examples: [],  // Initialize as null
};

const exampleSlice = createSlice({
  name: 'examples',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<[]>) {
      console.log(state, action);
      state.examples = action.payload;
    }
  },
});

export const { setProducts } = exampleSlice.actions;

export default exampleSlice.reducer;

export const selectCurrentExamples = (state: RootState) => state?.examples?.examples;
