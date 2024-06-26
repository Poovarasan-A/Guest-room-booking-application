import axios from "axios";
import {
  addPropertyFail,
  addPropertyReq,
  addPropertySuccess,
  deletePropertyFail,
  deletePropertyReq,
  deletePropertySuccess,
  getSinglePropertyFail,
  getSinglePropertyReq,
  getSinglePropertySuccess,
  updatePropertyFail,
  updatePropertyReq,
  updatePropertySuccess,
} from "../slices/propertySlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// -------------------------------- add new Property -----------------------------------------

export const addNewProperty = (propertyData) => async (dispatch) => {
  try {
    dispatch(addPropertyReq());
    const { data } = await axios.post(`/api/new/property`, propertyData);
    dispatch(addPropertySuccess(data));
  } catch (error) {
    dispatch(addPropertyFail());
  }
};

// -------------------------------- Get all Properties -----------------------------------------

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

// -------------------------------- Get single Property -----------------------------------------

export const getSingleProperty = (id) => async (dispatch) => {
  try {
    dispatch(getSinglePropertyReq());
    const { data } = await axios.get(`/api/property/${id}`);
    dispatch(getSinglePropertySuccess(data));
  } catch (error) {
    dispatch(getSinglePropertyFail());
  }
};

// -------------------------------- Update Property -----------------------------------------

export const updateProperty = (id, propertyData) => async (dispatch) => {
  try {
    dispatch(updatePropertyReq());
    const { data } = await axios.put(
      `/api/update/property/${id}`,
      propertyData
    );
    dispatch(updatePropertySuccess(data));
  } catch (error) {
    dispatch(updatePropertyFail());
  }
};

// -------------------------------- Delete Property -----------------------------------------

export const deleteProperty = (id) => async (dispatch) => {
  try {
    dispatch(deletePropertyReq());
    await axios.delete(`/api/delete/property/${id}`);
    dispatch(deletePropertySuccess());
  } catch (error) {
    dispatch(deletePropertyFail());
  }
};
