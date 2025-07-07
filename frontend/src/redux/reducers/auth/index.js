import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    roleId: localStorage.getItem("roleId") || null,
    userName: localStorage.getItem("userName") || null,

    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.roleId = action.payload.roleId;
      localStorage.setItem("roleId", action.payload.roleId);
      state.userId = action.payload.userId;
      localStorage.setItem("userId", action.payload.userId);

      state.userName = action.payload.userName;
      localStorage.setItem("userName", action.payload.userName);
    },
    setLogout: (state) => {
      state.token = null;
      state.roleId = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
