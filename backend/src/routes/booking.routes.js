import { Router } from "express";
import { payNow, getBookings } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/pay-now").post(payNow);
router.route("/get-bookings").get(getBookings);
// router.route("/fix-seats-format").post(fixShowSeatsFormat);

export default router;
