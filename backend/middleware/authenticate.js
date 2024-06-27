import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

//This middleware is to check if the user is authenticated while interacting
export const isAuthenticatedUser = async (req, res, next) => {
  //Extract token from cookies
  const { token } = req.cookies;
  //if token not present, it will return message to the user
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource." });
  }

  try {
    //verify and decode the token using the secrect key which we already setted in Usermodel
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Here we fetching user details based on decoded token
    req.user = await User.findById(decoded.id);

    //if user not found, return message to the user
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

//-------------------------- Authorised User Middleware --------------------------

//To check if the user is authorized based on user
export const authorizedUser = (...userType) => {
  return (req, res, next) => {
    //Checks if user or user type is not defined
    if (!req.user || !req.user.userType) {
      return res
        .status(403)
        .json({ message: "User Type is not defined. Access denied." });
    }
    //Checks if the user type is included in the allowed types, which we will mention in routes
    if (!userType.includes(req.user.userType)) {
      return res.status(403).json({
        message: `${req.user.userType} is not authorized to access this resource.`,
      });
    }

    next();
  };
};
