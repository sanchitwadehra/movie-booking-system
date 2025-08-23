import { Router } from "express";
import { getMovies, getScreens, getShow } from "../controllers/db.controller.js";
import { publicApiLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.route("/movies").get(publicApiLimiter, getMovies);
router.route("/screens").post(publicApiLimiter, getScreens);
router.route("/show").post(publicApiLimiter, getShow);

export default router;
