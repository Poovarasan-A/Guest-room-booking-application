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
router
  .route("/update/property/:id")
  .put(isAuthenticatedUser, authorizedUser("owner"), updateProperty);
router.route("/room/:id").get(singleRoom);
router
  .route("/update/room/:id")
  .put(
    isAuthenticatedUser,
    authorizedUser("owner"),
    upload.array("images"),
    updateRoom
  );
router
  .route("/delete/property/:id")
  .delete(isAuthenticatedUser, authorizedUser("owner"), deleteProperty);
router
  .route("/delete/room/:id")
  .delete(isAuthenticatedUser, authorizedUser("owner"), deleteRoom);
router
  .route("/properties/:id")
  .get(isAuthenticatedUser, authorizedUser("owner"), getOwnerProperties);

export default router;
