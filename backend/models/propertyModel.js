import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    minLength: [6, "Please enter valid post code"],
  },
  description: {
    type: String,
    required: [true, "Please provide property description"],
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
});

export const Property = mongoose.model("Property", propertySchema);
