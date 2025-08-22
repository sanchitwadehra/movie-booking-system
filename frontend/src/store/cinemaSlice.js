import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cinemas: [],
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setCinemaData: (state, action) => {
      state.cinemas = action.payload;
    }
  },
});

export const { setCinemaData } = cinemaSlice.actions;

export default cinemaSlice.reducer;
