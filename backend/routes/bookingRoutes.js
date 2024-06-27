import express from "express";
import {
  getGuestBookings,
  getSingleBooking,
  newBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
router.route("/create/booking").post(newBooking);
router.route("/booking/:id").get(getSingleBooking);
router.route("/guest/bookings/:id").get(getGuestBookings);

export default router;
