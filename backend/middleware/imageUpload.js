//Used multer library to handle uploading and storing images or files
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  //setting destination folder for upload files
  destination: (req, file, cb) => {
    //Here Defined folder path for storing images
    const directory = path.join(__dirname, "..", "images");

    //This checks if the folder already exists, if not, will create a new folder in above mentioned name
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    //passed the directory to the callback
    cb(null, directory);
  },

  //setting filename for the uploaded files & mentioned to use the original filename while storing
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//created upload middleware with deifined storage configuration
const upload = multer({ storage });

export default upload;
