import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regionData: null,
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.regionData = action.payload;
    },
    clearRegion: (state) => {
      state.regionData = null;
    },
  },
});

export const { setRegion, clearRegion } = regionSlice.actions;

export default regionSlice.reducer;
