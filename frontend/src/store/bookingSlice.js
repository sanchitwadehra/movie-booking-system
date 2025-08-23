import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pendingBookings: {}, // Object to store booking data by showId
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    saveSeatSelection: (state, action) => {
      const { showId, selectedSeats, numSeats } = action.payload;
      state.pendingBookings[showId] = {
        selectedSeats,
        numSeats,
        timestamp: Date.now(), // To track when the selection was made
      };
    },
    clearSeatSelection: (state, action) => {
      const { showId } = action.payload;
      delete state.pendingBookings[showId];
    },
    clearAllBookingData: (state) => {
      state.pendingBookings = {};
    },
    // Clean up old booking data (older than 24 hours)
    cleanupOldBookings: (state) => {
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      Object.keys(state.pendingBookings).forEach(showId => {
        if (state.pendingBookings[showId].timestamp < oneDayAgo) {
          delete state.pendingBookings[showId];
        }
      });
    },
  },
});

export const { 
  saveSeatSelection, 
  clearSeatSelection, 
  clearAllBookingData,
  cleanupOldBookings 
} = bookingSlice.actions;

export default bookingSlice.reducer;
