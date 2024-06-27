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

const router = express.Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/user/:id").get(specificUser);
router.route("/update/user/:id").put(updateUser);

export default router;
