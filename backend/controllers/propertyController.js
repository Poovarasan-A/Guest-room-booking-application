import { Property } from "../models/propertyModel.js";
import { Room } from "../models/roomModel.js";

//============================ Adding new property ==============================

export const addproperty = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;

    const property = await Property.create(req.body);
    res.status(201).json({ sucess: true, property });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//============================ Adding new room ==================================

export const addRoom = async (req, res, next) => {
  const { id } = req.params;
  req.body.property = id;

  let images = [];

  const BASE_URL = `${req.protocol}://${req.get("host")}`;

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/images/${file.filename}`; // Use file.filename instead of file.originalname
      images.push(url);
    });
  }
  req.body.images = images;

  if (typeof req.body.amenities === "string") {
    req.body.amenities = req.body.amenities
      .split(",")
      .map((amenity) => amenity.trim());
  }

  const room = new Room({
    ...req.body,
  });

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    property.rooms.push(room._id);
    await property.save();
    await room.save();
    res.status(201).json({ sucess: true, room });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//============================ get all rooms ==================================

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("property", "city state");

    res.status(201).json({
      message: "Rooms fetched Successfully",
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//============================ get all properties ==================================

export const getAllProperties = async (req, res, next) => {
  try {
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

//============================ get single properties ==================================

export const singleProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name"
    );
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

//============================ Update properties ==================================

export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }

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

//============================ get single Room ==================================

export const singleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    res.status(201).json({ message: "Room fetched Successfully", room });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//============================ Update Room ==================================

export const updateRoom = async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }

    let images = [];

    if (req.body.imagesDeleted === "false") {
      images = room.images;
    }

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/images/${file.filename}`; // Use file.filename instead of file.originalname
        images.push(url);
      });
    }

    req.body.images = images;

    if (typeof req.body.amenities === "string") {
      req.body.amenities = req.body.amenities
        .split(",")
        .map((amenity) => amenity.trim());
    }

    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ message: "Room Updated Successfully", room });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//============================ Delete Property ==================================

export const deleteProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }

    property = await Property.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Property deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//============================ Delete Room ======================================

export const deleteRoom = async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }

    room = await Room.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Room deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
