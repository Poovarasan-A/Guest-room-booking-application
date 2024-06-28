import express from "express";
import {
  addproperty,
  addRoom,
  deleteProperty,
  deleteRoom,
  getAllProperties,
  getAllRooms,
  getOwnerProperties,
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

//-------------------------------------- Property Routes ------------------------------

//Route for adding property based on authticated and authorised user
router
  .route("/new/property")
  .post(isAuthenticatedUser, authorizedUser("owner"), addproperty);

//Route for getting all properties
router.route("/properties").get(getAllProperties);

//Route for Getting particular property
router.route("/property/:id").get(singleProperty);

//Route for getting only owner based properties
router
  .route("/properties/:id")
  .get(isAuthenticatedUser, authorizedUser("owner"), getOwnerProperties);

//Route for updating properties using property id
router
  .route("/update/property/:id")
  .put(isAuthenticatedUser, authorizedUser("owner"), updateProperty);

//Route for deleting properties using property id
router
  .route("/delete/property/:id")
  .delete(isAuthenticatedUser, authorizedUser("owner"), deleteProperty);

//------------------------------------ Room Routes ------------------------------------

//Route for adding room based on authorised user with images
router
  .route("/addroom/:id")
  .post(
    isAuthenticatedUser,
    authorizedUser("owner"),
    upload.array("images"),
    addRoom
  );

//Route for getting all rooms
router.route("/rooms").get(getAllRooms);

//Route for getting particular room
router.route("/room/:id").get(singleRoom);

//Route for Updating room using room id
router
  .route("/update/room/:id")
  .put(
    isAuthenticatedUser,
    authorizedUser("owner"),
    upload.array("images"),
    updateRoom
  );

//Route for Deleting room using room id
router
  .route("/delete/room/:id")
  .delete(isAuthenticatedUser, authorizedUser("owner"), deleteRoom);

export default router;
