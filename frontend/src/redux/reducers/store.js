import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import postsReducer from "./posts/index";
import usersReducer from "./users/index";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    postsReducer: postsReducer,
    usersReducer: usersReducer,
  },
});

export default store;
