import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  specificUser,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/authenticate.js";
import upload from "../middleware/imageUpload.js";

//Getting Router() from express and stored as router to use
const router = express.Router();

//defined routes with corresponding controller functions and middlewares
//used POST method for collecting datas from user
//used GET method for collecting datas from database
//used PUT method for Updating datas to database
//used DELETE method for deleting datas from database
//used middleware "upload.js" to upload images
//mentioned some routes with authenticated user to perform authentication actions

//------------------------- Routes of Users -----------------------------------
//Route for User Register
router.route("/register").post(upload.single("avatar"), registerUser);
//Route for User Login
router.route("/login").post(loginUser);
//Route for User Logout
router.route("/logout").get(logoutUser);
//Route for Getting logged user details
router.route("/profile").get(isAuthenticatedUser, getUserProfile);
//Route for Fetching specific user details
router.route("/user/:id").get(specificUser);
//Route for updating user details
router.route("/update/user/:id").put(updateUser);

export default router;
