import { Booking } from "../models/bookingModel.js";

export const newBooking = async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({
      message: "Room booked successfully",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getSingleBooking = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const bookings = await Booking.find({ room: roomId });

    res.status(200).json({
      message: "Booking fetched successfully",
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
