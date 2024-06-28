import { Booking } from "../models/bookingModel.js";

//================================= Create new booking ========================================

export const newBooking = async (req, res, next) => {
  try {
    //creating new booking with datas provide from user under defined schema
    const booking = new Booking(req.body);

    //saving the booking to database
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

//================================= Get Particular booking ========================================

export const getSingleBooking = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    //Find and send all bookings using specific Id from request
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

//================================= get guest bookings ========================================

export const getGuestBookings = async (req, res, next) => {
  const userId = req.params.id;
  try {
    //Find and send all bookings of specific guest using guest Id from request
    const bookings = await Booking.find({ guest: userId })
      .populate("room", "roomName images")
      .populate("property", "state city");

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

//===================================== End =============================================
