import mongoose from "mongoose";
import validator from "validator"; // Used validator library for input validations
import jwt from "jsonwebtoken";

//Defined fields to collect datas from user and marked some fields with required and message
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
  images: [
    {
      type: String,
    },
  ],
  userType: { type: String, default: "guest" },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

//For generating JSON web token(JWT) while user login and signUp
userSchema.methods.getJwtToken = function () {
  //sign and return a JWT using the user's Id, secret key,and already mentioned expiration time from .env file
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

export const User = mongoose.model("User", userSchema);
