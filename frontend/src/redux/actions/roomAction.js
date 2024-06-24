import axios from "axios";
import { addRoomFail, addRoomReq, addRoomSuccess } from "../slices/roomSlices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewRoom = (roomData) => async (dispatch) => {
  try {
    dispatch(addRoomReq());
    const { data } = await axios.post(`/api/new/room`, roomData);
    dispatch(addRoomSuccess(data));
  } catch (error) {
    dispatch(addRoomFail());
  }
};

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
