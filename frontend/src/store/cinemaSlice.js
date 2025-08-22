import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cinemas: [],
  loading: false,
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setCinemaData: (state, action) => {
      state.cinemas = action.payload;
    },
    setCinemaLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCinemaData, setCinemaLoading } = cinemaSlice.actions;

export default cinemaSlice.reducer;
