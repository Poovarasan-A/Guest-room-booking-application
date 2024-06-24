import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  mobile: {
    type: Number,
    required: [true, "Please enter mobile number"],
    minLength: [10, "Please enter valid mobile number"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please create your password"],
    minLength: [6, "Password characters should be atleast 6"],
    select: false,
  },
  userType: { type: String, enum: ["owner", "customer"] },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

export const User = mongoose.model("User", userSchema);
