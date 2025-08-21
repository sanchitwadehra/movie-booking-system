import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  route: null,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setLastRoute: (state, action) => {
      state.route = action.payload;
    },
  },
});

export const { setLastRoute } = routeSlice.actions;

export default routeSlice.reducer;
