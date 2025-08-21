import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  cookieChecked: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestLogin: (state, action) => {
      state.userData = action.payload;
    },
    verifyLogin: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    cookieChecked: (state) => {
      state.cookieChecked = true;
    },
  },
});

export const { requestLogin, verifyLogin, logout, cookieChecked } = authSlice.actions;

export default authSlice.reducer;
