import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";
import { publicApiLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.route("/").get(publicApiLimiter, healthCheck);

export default router;
