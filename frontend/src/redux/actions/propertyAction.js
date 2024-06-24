import axios from "axios";
import {
  addPropertyFail,
  addPropertyReq,
  addPropertySuccess,
} from "../slices/propertySlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewProperty = (propertyData) => async (dispatch) => {
  try {
    dispatch(addPropertyReq());
    const { data } = await axios.post(`/api/new/property`, propertyData);
    dispatch(addPropertySuccess(data));
  } catch (error) {
    dispatch(addPropertyFail());
  }
};

export const getProperties = createAsyncThunk(
  "property/getProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/properties`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
