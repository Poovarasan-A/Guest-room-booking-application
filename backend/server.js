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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config({ path: path.join(__dirname, "config/.env") });

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/", user);
app.use("/api/", property);
app.use("/api/", booking);

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
