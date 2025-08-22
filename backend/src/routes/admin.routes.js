import { Router } from "express";
import {
  addMovie,
  addCinema,
  addScreen,
  addShow,
  generateSampleData,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT, isAdmin);

router.route("/movie").post(addMovie);
router.route("/cinema").post(addCinema);
router.route("/screen").post(addScreen);
router.route("/show").post(addShow);
router.route("/generate-sample-data").post(generateSampleData);

export default router;
