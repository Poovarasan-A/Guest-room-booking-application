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

    const { data } = await axios.post(`/api/register`, formData);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail());
  }
};

//==================== Login Action =================================

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginReq());
    const { data } = await axios.post(`/api/login`, formData);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail());
  }
};

//Load Loggedin User datas

export const loggedUser = createAsyncThunk(
  "user/loggedUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/profile`);
      return response.data;
    } catch (error) {
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
    const { data } = await axios.put(`/api/update/user/${id}`, userData);
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFail(error));
  }
};

//==================== Update Action =================================

export const logoutUser = async (dispatch) => {
  try {
    await axios.get("/api/logout/");
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFail(error));
  }
};
