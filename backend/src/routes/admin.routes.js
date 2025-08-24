import { Router } from "express";
import {
  addMovie,
  addCinema,
  addScreen,
  addShow,
  generateSampleData,
  triggerCronDataRefresh,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { loggedInLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.use(verifyJWT, isAdmin);

router.route("/movie").post(loggedInLimiter, addMovie);
router.route("/cinema").post(loggedInLimiter, addCinema);
router.route("/screen").post(loggedInLimiter, addScreen);
router.route("/show").post(loggedInLimiter, addShow);
router.route("/generate-sample-data").post(loggedInLimiter, generateSampleData);
router.route("/trigger-cron-refresh").post(loggedInLimiter, triggerCronDataRefresh);

export default router;
