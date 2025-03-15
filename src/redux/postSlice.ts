import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "../types";
import { fetchPosts as fetchPostsAPI } from "../services/api";

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  status: "idle",
  error: null,
  searchTerm: "",
  currentPage: 1,
  postsPerPage: 6,
  totalPages: 0,
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
      state.currentPage = 1;
      state.totalPages = Math.ceil(
        state.filteredPosts.length / state.postsPerPage
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPostsPerPage: (state, action: PayloadAction<number>) => {
      state.postsPerPage = action.payload;
      state.totalPages = Math.ceil(state.filteredPosts.length / action.payload);
      // Reset to page 1 if current page is beyond new total
      if (state.currentPage > state.totalPages) {
        state.currentPage = 1;
      }
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
        state.totalPages = Math.ceil(
          action.payload.length / state.postsPerPage
        );
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setSearchTerm, setCurrentPage, setPostsPerPage } =
  postsSlice.actions;
export default postsSlice.reducer;
