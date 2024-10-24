import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IPost } from '@/types';
 

interface PostState {
  posts: IPost[]; // Add a property for filtered products
}

const initialState: PostState = {
  posts: [],  // Initialize as null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPost[]>) {
      console.log(state, action);
      state.posts = action.payload;
    }
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;

export const selectCurrentPosts = (state: RootState) => state?.posts?.posts;
