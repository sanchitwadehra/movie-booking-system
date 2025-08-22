import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Movie = mongoose.model("Movie", movieSchema);

Movie.on("error", function (error) {
  console.error("Movie Model Error:", error);
});
