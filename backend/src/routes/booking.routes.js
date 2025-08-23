import { Router } from "express";
import { payNow, getBookings } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loggedInLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/pay-now").post(loggedInLimiter, payNow);
router.route("/get-bookings").get(loggedInLimiter, getBookings);
// router.route("/fix-seats-format").post(fixShowSeatsFormat);

export default router;
