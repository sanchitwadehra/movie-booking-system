import { Router } from "express";
import {
  verifyEmailandPassword,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  loginLimiter,
  publicApiLimiter,
  loggedInLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = Router();

//public routes
router.route("/").post(loginLimiter, verifyEmailandPassword);
router.route("/refresh").post(publicApiLimiter, refreshAccessToken);

//private routes
router.route("/logout").post(verifyJWT, loggedInLimiter, logoutUser);

export default router;
