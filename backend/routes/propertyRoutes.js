import express from "express";
import {
  addproperty,
  addRoom,
  deleteProperty,
  deleteRoom,
  getAllProperties,
  getAllRooms,
  singleProperty,
  singleRoom,
  updateProperty,
  updateRoom,
} from "../controllers/propertyController.js";
import {
  authorizedUser,
  isAuthenticatedUser,
} from "../middleware/authenticate.js";
import upload from "../middleware/imageUpload.js";

const router = express.Router();

router
  .route("/new/property")
  .post(isAuthenticatedUser, authorizedUser("owner"), addproperty);
router
  .route("/addroom/:id")
  .post(
    isAuthenticatedUser,
    authorizedUser("owner"),
    upload.array("images"),
    addRoom
  );
router.route("/rooms").get(getAllRooms);
router.route("/properties").get(getAllProperties);
router.route("/property/:id").get(singleProperty);
router.route("/update/property/:id").put(updateProperty);
router.route("/room/:id").get(singleRoom);
router.route("/update/room/:id").put(updateRoom);
router.route("/delete/property/:id").delete(deleteProperty);
router.route("/delete/room/:id").delete(deleteRoom);

export default router;
