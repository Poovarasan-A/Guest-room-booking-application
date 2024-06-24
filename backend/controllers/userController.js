import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendToken from "../utils/tokenResponse.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(500).json({ message: "Invalid password" });
    }

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Logged out successfully!!" });
};
