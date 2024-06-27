import axios from "axios";
import {
  getGuestBookingFail,
  getGuestBookingReq,
  getGuestBookingSuccess,
  getSingleBookingFail,
  getSingleBookingReq,
  getSingleBookingSuccess,
  newBookingFail,
  newBookingReq,
  newBookingSuccess,
} from "../slices/bookingSlice";

export const newBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch(newBookingReq());
    const { data } = await axios.post(`/api/create/booking`, bookingData);
    dispatch(newBookingSuccess(data));
  } catch (error) {
    dispatch(newBookingFail());
  }
};

export const roombookings = (id) => async (dispatch) => {
  try {
    dispatch(getSingleBookingReq());
    const { data } = await axios.get(`/api/booking/${id}`);
    dispatch(getSingleBookingSuccess(data));
  } catch (error) {
    dispatch(getSingleBookingFail());
  }
};

export const guestRoomBookings = (id) => async (dispatch) => {
  try {
    dispatch(getGuestBookingReq());
    const { data } = await axios.get(`/api/guest/bookings/${id}`);
    dispatch(getGuestBookingSuccess(data));
  } catch (error) {
    dispatch(getGuestBookingFail());
  }
};
