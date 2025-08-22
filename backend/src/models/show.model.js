import mongoose, { Schema } from "mongoose";

const showSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Movie is required"],
    },
    seatsBooked: {
      type: Array,
      required: [true, "Seats booked are required"],
      default: [],
    },
    showtime: {
      type: Date,
      required: [true, "Showtime is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Show = mongoose.model("Show", showSchema);

Show.on("error", function (error) {
  console.error("Show Model Error:", error);
});
