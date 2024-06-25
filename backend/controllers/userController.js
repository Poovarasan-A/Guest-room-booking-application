import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendToken from "../utils/tokenResponse.js";

//============================ Register user ======================================

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

//============================ Login user ======================================

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
    return res.status(401).json({ message: error.message });
  }
};

//============================ Logout user ======================================

export const logoutUser = async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Logged out successfully!!" });
};

//============================ get user profile ======================================

export const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ message: "Profile fetched successfully", user });
};

//============================ get specific user ======================================

export const specificUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(201).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

//============================ Update user ======================================

export const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
