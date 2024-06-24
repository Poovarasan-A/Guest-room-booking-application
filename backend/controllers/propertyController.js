import { Property } from "../models/propertyModel.js";
import { Room } from "../models/roomModel.js";

//============================ Adding new property ==============================

export const addproperty = async (req, res, next) => {
  try {
    // req.body.owner = req.owner.id;

    const property = await Property.create(req.body);
    res.status(201).json({ sucess: true, property });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//============================ Adding new room ==================================

export const addRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ sucess: true, room });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//============================ get all rooms ==================================

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

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

//============================ Update properties ==================================

export const singleProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
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
