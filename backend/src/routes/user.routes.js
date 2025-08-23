import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loggedInLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, loggedInLimiter, getCurrentUser);

export default router;
