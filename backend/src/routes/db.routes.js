import { Router } from "express";
import { getMovies, getScreens, getShow } from "../controllers/db.controller.js";

const router = Router();

router.route("/movies").get(getMovies);
router.route("/screens").post(getScreens);
router.route("/show").post(getShow);

export default router;
