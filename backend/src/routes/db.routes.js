import { Router } from "express";
import { getMovies, getScreens } from "../controllers/db.controller.js";

const router = Router();

router.route("/movies").get(getMovies);
router.route("/screens").post(getScreens);

export default router;
