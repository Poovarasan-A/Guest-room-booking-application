import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  //Reference to the booked room, for fetching bookings based on room
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  //Reference to the guest who making the booking
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //Reference to the owner of the property, to update the booked rooms
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //Reference to the property being booked
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  //To store Guest booked check In date
  startDate: {
    type: Date,
    required: [true, "Please select checkIn date"],
  },
  //To store Guest booked check Out date
  endDate: {
    type: Date,
    required: [true, "Please select checkOut date"],
  },
  //Total room price of the booked dates by guest
  totalPrice: {
    type: Number,
    required: true,
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
