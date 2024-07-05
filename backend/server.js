import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import user from "./routes/userRoutes.js";
import property from "./routes/propertyRoutes.js";
import cors from "cors";
import booking from "./routes/bookingRoutes.js";

//Here obtain the filename and directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//configured environmental variables using dotenv
dotenv.config({ path: path.join(__dirname, "config/.env") });

//Here defined CORS options to allow requests from a frontend and Enabled CORS options to use
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

//Mentioned to serve static images from "Images" directory to frontend
app.use("/images", express.static(path.join(__dirname, "images")));

//Route handlers for various end points
app.use("/api/", user);
app.use("/api/", property);
app.use("/api/", booking);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT;

//Making connection to database
connectDB();

app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
