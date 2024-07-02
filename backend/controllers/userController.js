import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendToken from "../utils/tokenResponse.js";

//============================ Register user ======================================

export const registerUser = async (req, res, next) => {
  try {
    //Extract user details from frontend request
    const { name, email, mobile, password } = req.body;
    //using regEx for email validation
    let isEmail = /^[a-z]+@[a-z]+\.[a-z]+$/;

    if (!isEmail.test(email)) {
      res.status(400).json({ message: "Please enter valid Email" });
    }
    //using regEx for mobile number validation
    let mobNum = /\d{10}/;

    if (!mobNum.test(mobile)) {
      res.status(400).json({ message: "Please enter valid Mobile number" });
    }

    //using regEx for mobile number validation
    let isPassowrd = /\w\d{6}/;

    if (!isPassowrd.test(password)) {
      res
        .status(400)
        .json({ message: "Password characters should be atleast 6" });
    }

    let images = [];
    //here we creating base url to store images as url because host may vary while deploying
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    //Process each uploaded images and store thier urls
    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/images/${file.filename}`;
        images.push(url);
      });
    }
    req.body.images = images;

    //Here we hasing password for security(encrypting the password using bcrypt library)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user in the database using details provided by user
    const user = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword,
      images,
    });
    //send jwt token in response to store as cookie in browser upon successful registration
    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//============================ Login user =========================================

export const loginUser = async (req, res, next) => {
  try {
    //Extract email and password from user inputs in frontend
    const { email, password } = req.body;

    //checks if email & password are provided by user
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    //here searching user in database by email & password
    const user = await User.findOne({ email }).select("+password");

    //checks if user not found, return not found message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Here comparing password from user inputs with stored password in db
    const isValidPassword = await bcrypt.compare(password, user.password);

    //checks password is valid or not
    if (!isValidPassword) {
      return res.status(500).json({ message: "Invalid password" });
    }
    //sending token in response
    sendToken(user, 201, res);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

//============================ Logout user =======================================

export const logoutUser = async (req, res, next) => {
  //Clearing the JWT token from browser cookies to make logout
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
  //Fetch and return the user details based on user Id from request(logged user details)
  const user = await User.findById(req.user.id);

  res.status(200).json({ message: "Profile fetched successfully", user });
};

//============================ get specific user ======================================

export const specificUser = async (req, res, next) => {
  try {
    //This fetch and return a specific user detail based on user Id from parameter
    const user = await User.findById(req.params.id);

    //Checks user existance
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
    //Handle error during user retrival
    return res.status(401).json({ message: error.message });
  }
};

//============================ Update user =================================================

export const updateUser = async (req, res, next) => {
  try {
    //Finds user by user Id from request parameters
    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    //Prepare array to store updated images
    let images = [];

    //checks if the user deletes images to retain existing images
    if (req.body.imagesDeleted === "false") {
      images = user.images;
    }

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/images/${file.filename}`;
        images.push(url);
      });
    }

    req.body.images = images;

    //Update user details with the new details provide by user also running validations on new inputs
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

//===================================== End =================================================
