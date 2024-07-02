import { Property } from "../models/propertyModel.js";
import { Room } from "../models/roomModel.js";

//Property Controllers

//============================ Adding new property ==============================

export const addproperty = async (req, res, next) => {
  try {
    //assigning current user Id as owner of the property
    req.body.owner = req.user._id;

    //creating new property in database using details provide by user in request
    const property = await Property.create(req.body);
    res.status(201).json({ sucess: true, property });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//================================= get all properties ==================================

export const getAllProperties = async (req, res, next) => {
  try {
    //Fetch all properties from the database
    const properties = await Property.find();

    res.status(201).json({
      message: "Properties fetched Successfully",
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//============================ get authenticated properties ==============================

export const getOwnerProperties = async (req, res, next) => {
  const ownerId = req.params.id;
  try {
    //Fetch properties only owned by as specific user
    const properties = await Property.find({ owner: ownerId });
    res.status(201).json({
      message: "Properties of owner fetched successfully",
      properties,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//================================= get single properties =================================

export const singleProperty = async (req, res, next) => {
  try {
    //Fetching specific property by property Id from parameter and populate owner details to show in client side
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name"
    );
    //checks property existance
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }
    res
      .status(201)
      .json({ message: "Property fetched Successfully", property });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//==================================== Update properties ==================================

export const updateProperty = async (req, res, next) => {
  try {
    //Find property in db using property id from request
    let property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }
    //Updating the property with new data provided by user also running validations on it
    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(201)
      .json({ message: "Property Updated Successfully", property });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//================================ Delete Property ========================================

export const deleteProperty = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    //Find property in db using property id from request
    let property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }

    //if the user delete particular property also Delete all rooms associated with that property
    await Room.deleteMany({ property: propertyId });

    //this deletes the property from the database
    property = await Property.findByIdAndDelete(propertyId);
    res.status(201).json({ message: "Property deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Room Controllers

//============================ Adding new room ===================================

export const addRoom = async (req, res, next) => {
  //Fetching property id from request to store rooms under that property
  const { id } = req.params;
  req.body.property = id;

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

  //Here converting and storing amenities string to array if provide as string for showing amenities seperately in client side
  if (typeof req.body.amenities === "string") {
    req.body.amenities = req.body.amenities.split(",");
  }

  //Create a new room associated with the particular property
  const room = new Room({
    ...req.body,
  });

  try {
    //Finds property by above fetched id
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    //Adding room to property's rooms array and save both
    property.rooms.push(room._id);
    await property.save();
    await room.save();
    res.status(201).json({ sucess: true, room });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//================================== get all rooms ====================================

export const getAllRooms = async (req, res, next) => {
  try {
    //Fetching all rooms from the database and populate property details to show in client side
    const rooms = await Room.find().populate("property", "city state");

    //success response with count of rooms
    res.status(201).json({
      message: "Rooms fetched Successfully",
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//==================================== get single Room ================================

export const singleRoom = async (req, res, next) => {
  try {
    //Fetching a specific room by room Id
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    res.status(201).json({ message: "Room fetched Successfully", room });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//================================== Update Room =======================================

export const updateRoom = async (req, res, next) => {
  try {
    //Fetching a specific room by room Id for checking room existance
    let room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    //Prepare array to store updated images
    let images = [];

    //checks if the user deletes images to retain existing images
    if (req.body.imagesDeleted === "false") {
      images = room.images;
    }

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/images/${file.filename}`;
        images.push(url);
      });
    }

    req.body.images = images;

    if (typeof req.body.amenities === "string") {
      req.body.amenities = req.body.amenities.split(",");
    }

    //Updating room with new data also run validations on new data
    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ message: "Room Updated Successfully", room });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//================================= Delete Room ======================================

export const deleteRoom = async (req, res, next) => {
  try {
    //Find room based on id provided in request to make delete operation
    let room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    //Delete the room using room id from the database
    room = await Room.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Room deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//==================================== End ===========================================
