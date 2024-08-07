import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  //Reference to the property the room belongs to, for adding rooms under particular property
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  roomName: {
    type: String,
    required: [true, "Please provide room name"],
  },
  floorSize: {
    type: String,
    required: [true, "Please provide floor size"],
  },
  noOfBeds: {
    type: Number,
    required: [true, "Please provide no.of.beds"],
  },
  noOfGuests: {
    type: Number,
    required: [true, "Please provide guests details"],
  },
  amenities: [
    {
      type: String,
      required: [true, "Please provide amneties"],
    },
  ],
  rentPerDay: {
    type: Number,
    required: [true, "Please provide rent for per day"],
  },
  minBookingDays: {
    type: Number,
    required: [true, "Please add minimum booking days"],
  },
  maxBookingDays: {
    type: Number,
    required: [true, "Please add maximum booking days"],
  },
  images: [
    {
      type: String,
      required: true,
      minLength: [5, "Please add atleast 5 images"],
    },
  ],
});

export const Room = mongoose.model("Room", roomSchema);
