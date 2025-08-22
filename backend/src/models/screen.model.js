import mongoose, { Schema } from "mongoose";

const screenSchema = new Schema(
  {
    screenNumber: {
      type: Number,
      required: [true, "Screen number is required"],
    },
    shows: {
      type: [Schema.Types.ObjectId],
      ref: "Show",
      required: [true, "Shows are required"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Screen = mongoose.model("Screen", screenSchema);

Screen.on("error", function (error) {
  console.error("Screen Model Error:", error);
});
