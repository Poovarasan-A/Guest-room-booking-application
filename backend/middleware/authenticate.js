import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login again." });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Invalid token. Please login again." });
  }
};

export const authorizedUser = (...userType) => {
  return (req, res, next) => {
    if (!req.user || !req.user.userType) {
      return res
        .status(403)
        .json({ message: "User Type is not defined. Access denied." });
    }

    if (!userType.includes(req.user.userType)) {
      return res.status(403).json({
        message: `${req.user.userType} is not authorized to access this resource.`,
      });
    }

    next();
  };
};
