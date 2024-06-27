//Used mongoose library for interacting with mongoDB
import mongoose from "mongoose";

// Created an asynchronus funciton to connect with database using connection string from .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Yay!! Successfully connected to database!");
  } catch (error) {
    console.log(`Error:${error.message}`);
    //Exit the process with failure code
    process.exit(1);
  }
};

export default connectDB;
