import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: [true, "Please select checkIn date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please select checkOut date"],
  },
});
