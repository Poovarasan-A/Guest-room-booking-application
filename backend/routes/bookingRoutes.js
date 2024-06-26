import express from "express";
import {
  getSingleBooking,
  newBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/create/booking").post(newBooking);
router.route("/booking/:id").get(getSingleBooking);

export default router;
