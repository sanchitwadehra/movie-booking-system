import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const isAdmin = asyncHandler(async (req, _, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      throw new ApiError(403, "Admin access required");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Admin Access");
  }
  });