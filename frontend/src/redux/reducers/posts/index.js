import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePostById: (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) => {
        if (post._id === updatedPost._id) {
          return {
            ...post,
            title: updatedPost.title,
            description: updatedPost.description,
            media: updatedPost.media,
          };
        }
        return post;
      });
    },
    deletePostById: (state, action) => {
      const id = action.payload;
      state.posts = state.posts.filter((post) => post._id !== id);
    },
  },
});

export const { setPosts, addPost, updatePostById, deletePostById } =
  postSlice.actions;

export default postSlice.reducer;
