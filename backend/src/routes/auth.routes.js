import { Router } from "express";
import {
  verifyEmailandPassword,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//public routes
router.route("/").post(verifyEmailandPassword);
router.route("/refresh").post(refreshAccessToken);

//private routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
