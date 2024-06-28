import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    bookings: [],
    isBookingCreated: false,
    error: null,
  },
  reducers: {
    // -------------------------------------- Add new Booking  -----------------------------------------

    newBookingReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newBookingSuccess(state, action) {
      return {
        ...state,
        loading: false,
        booking: action.payload.booking,
        isBookingCreated: true,
      };
    },
    newBookingFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isBookingCreated: false,
      };
    },
    // -------------------------------------- Get particular Boooking  -----------------------------------------

    getSingleBookingReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getSingleBookingSuccess(state, action) {
      return {
        ...state,
        loading: false,
        bookings: action.payload.bookings,
      };
    },
    getSingleBookingFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    // -------------------------------------- Get Guest Boookings  -----------------------------------------

    getGuestBookingReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getGuestBookingSuccess(state, action) {
      return {
        ...state,
        loading: false,
        bookings: action.payload.bookings,
      };
    },
    getGuestBookingFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = bookSlice;

export const {
  newBookingReq,
  newBookingSuccess,
  newBookingFail,
  getSingleBookingReq,
  getSingleBookingSuccess,
  getSingleBookingFail,
  getGuestBookingReq,
  getGuestBookingSuccess,
  getGuestBookingFail,
} = actions;

export default reducer;
