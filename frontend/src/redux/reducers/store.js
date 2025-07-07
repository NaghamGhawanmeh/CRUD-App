import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
  },
});

export default store;
