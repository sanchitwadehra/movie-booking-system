import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    show: {
      type: Schema.Types.ObjectId,
      ref: "Show",
      required: [true, "Show is required"],
    },
    seatsBooked: {
      type: Array,
      required: [true, "Seats booked are required"],
    }
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);

Booking.on("error", function (error) {
  console.error("Booking Model Error:", error);
});
