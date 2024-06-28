import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginFail,
  loginReq,
  loginSuccess,
  logoutUserFail,
  logoutUserSuccess,
  registerFail,
  registerReq,
  registerSuccess,
  updateUserFail,
  updateUserReq,
  updateUserSuccess,
} from "../slices/userSlices";
import axios from "axios";

//==================== Register Action =================================

export const newUser = (formData) => async (dispatch) => {
  try {
    dispatch(registerReq());
    //configuring headers to send images
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    //posting user details to register
    const { data } = await axios.post(`/api/register`, formData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

//==================== Login Action =================================

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginReq());
    //posting user details to check the user existance and login
    const { data } = await axios.post(`/api/login`, formData);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

//========================= Load Loggedin User datas =========================

export const loggedUser = createAsyncThunk(
  "user/loggedUser",
  async (_, { rejectWithValue }) => {
    try {
      //making get request to profile endpoint to fetch logged user details
      const response = await axios.get(`/api/profile`);
      return response.data;
    } catch (error) {
      //returning rejected promise with error value
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//==================== Update Action =================================

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(updateUserReq());
    // sending datas to update user details
    const { data } = await axios.put(`/api/update/user/${id}`, userData);
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
  }
};

//==================== Update Action =================================

export const logoutUser = async (dispatch) => {
  try {
    //sending request to logout user
    await axios.get("/api/logout/");
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFail(error.response.data.message));
  }
};
