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

//======================== new booking action ============================

export const newBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch(newBookingReq());
    const { data } = await axios.post(`/api/create/booking`, bookingData);
    dispatch(newBookingSuccess(data));
  } catch (error) {
    dispatch(newBookingFail());
  }
};

//======================== getting particular booking action ============================

export const roombookings = (id) => async (dispatch) => {
  try {
    dispatch(getSingleBookingReq());
    const { data } = await axios.get(`/api/booking/${id}`);
    dispatch(getSingleBookingSuccess(data));
  } catch (error) {
    dispatch(getSingleBookingFail());
  }
};

//======================== fetching guest bookings action ============================

export const guestRoomBookings = (id) => async (dispatch) => {
  try {
    dispatch(getGuestBookingReq());
    const { data } = await axios.get(`/api/guest/bookings/${id}`);
    dispatch(getGuestBookingSuccess(data));
  } catch (error) {
    dispatch(getGuestBookingFail());
  }
};
