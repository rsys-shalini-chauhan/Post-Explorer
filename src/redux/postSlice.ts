import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "../types";
import { fetchPosts as fetchPostsAPI } from "../services/api";

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPostsAPI();
  return response;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredPosts = state.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          post.body.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.filteredPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setSearchTerm } = postsSlice.actions;
export default postsSlice.reducer;
