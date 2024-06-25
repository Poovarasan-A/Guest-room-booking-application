import axios from "axios";
import {
  addRoomFail,
  addRoomReq,
  addRoomSuccess,
  deleteRoomFail,
  deleteRoomReq,
  deleteRoomSuccess,
  getSingleRoomFail,
  getSingleRoomReq,
  getSingleRoomSuccess,
  updateRoomFail,
  updateRoomReq,
  updateRoomSuccess,
} from "../slices/roomSlices";
import { createAsyncThunk } from "@reduxjs/toolkit";

// -------------------------------- Add new Room -----------------------------------------

export const addNewRoom = (id, combinedData) => async (dispatch) => {
  try {
    dispatch(addRoomReq());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `/api/addroom/${id}`,
      combinedData,
      config
    );
    dispatch(addRoomSuccess(data));
  } catch (error) {
    dispatch(addRoomFail());
  }
};

// -------------------------------- Get all rooms -----------------------------------------

export const getRooms = createAsyncThunk(
  "room/getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/rooms`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// -------------------------------- Get single Room -----------------------------------------

export const getSingleRoom = (id) => async (dispatch) => {
  try {
    dispatch(getSingleRoomReq());
    const { data } = await axios.get(`/api/room/${id}`);
    dispatch(getSingleRoomSuccess(data));
  } catch (error) {
    dispatch(getSingleRoomFail());
  }
};

// -------------------------------- Update Room -----------------------------------------

export const updateRoom = (id, roomData) => async (dispatch) => {
  try {
    dispatch(updateRoomReq());
    const { data } = await axios.put(`/api/update/room/${id}`, roomData);
    dispatch(updateRoomSuccess(data));
  } catch (error) {
    dispatch(updateRoomFail());
  }
};

// -------------------------------- Delete Room -----------------------------------------

export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch(deleteRoomReq());
    await axios.delete(`/api/delete/room/${id}`);
    dispatch(deleteRoomSuccess());
  } catch (error) {
    dispatch(deleteRoomFail());
  }
};
