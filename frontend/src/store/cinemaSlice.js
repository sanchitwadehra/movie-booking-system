import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cache: {},
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setCinemaData: (state, action) => {
      const { key, data } = action.payload;
      state.cache[key] = data;
    },
  },
});

export const { setCinemaData } = cinemaSlice.actions;

export default cinemaSlice.reducer;
