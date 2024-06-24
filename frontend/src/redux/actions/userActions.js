import {
  loginFail,
  loginReq,
  loginSuccess,
  registerFail,
  registerReq,
  registerSuccess,
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
