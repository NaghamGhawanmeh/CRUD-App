import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import postsReducer from "./posts/index";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    postsReducer: postsReducer,
  },
});

export default store;
