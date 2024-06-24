import express from "express";
import {
  addproperty,
  addRoom,
  getAllProperties,
  getAllRooms,
  singleProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.route("/new/property").post(addproperty);
router.route("/new/room").post(addRoom);
router.route("/rooms").get(getAllRooms);
router.route("/properties").get(getAllProperties);
router.route("/property/:id").get(singleProperty);

export default router;
