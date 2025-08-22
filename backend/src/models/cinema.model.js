import mongoose, { Schema } from "mongoose";

const cinemaSchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    screens: {
      type: [Schema.Types.ObjectId],
      ref: "Screen",
      required: [true, "Screens are required"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Cinema = mongoose.model("Cinema", cinemaSchema);

Cinema.on("error", function (error) {
  console.error("Cinema Model Error:", error);
});
