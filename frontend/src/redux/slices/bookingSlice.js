import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    bookings: [],
    error: null,
  },
  reducers: {
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
      };
    },
    newBookingFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

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
} = actions;

export default reducer;
