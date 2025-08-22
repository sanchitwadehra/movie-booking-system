import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cinemas: [],
  cache: {}, // Store cached data with keys like "movieId-date-city"
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setCinemaData: (state, action) => {
      const { cacheKey, data } = action.payload;
      state.cinemas = data;
      state.cache[cacheKey] = data;
    },
    getCachedCinemaData: (state, action) => {
      const { cacheKey } = action.payload;
      const cachedData = state.cache[cacheKey];
      if (cachedData) {
        state.cinemas = cachedData;
      }
    },
    clearCinemaCache: (state) => {
      state.cache = {};
      state.cinemas = [];
    }
  },
});

export const { setCinemaData, getCachedCinemaData, clearCinemaCache } = cinemaSlice.actions;

export default cinemaSlice.reducer;
