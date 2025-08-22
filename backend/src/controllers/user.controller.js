import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user?._id).select("-password -refreshToken -__v -createdAt -updatedAt -isAdmin");
  if (!currentUser) {
    throw new ApiError(400, "Some Error in Fetching User Details");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { currentUser }, "Current User Fetched"));
});

export { getCurrentUser };