import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieStatus: false,
  movieData: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movieStatus = true;
      state.movieData = action.payload;
    },
    clearMovies: (state) => {
      state.movieStatus = false;
      state.movieData = null;
    },
  },
});

export const { setMovies, clearMovies } = movieSlice.actions;

export default movieSlice.reducer;
