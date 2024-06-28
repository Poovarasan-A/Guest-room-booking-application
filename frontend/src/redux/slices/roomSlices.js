import { createSlice } from "@reduxjs/toolkit";
import { getRooms } from "../actions/roomAction";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    loading: false,
    isRoomCreated: false,
    isRoomUpdated: false,
    isRoomDeleted: false,
    rooms: [],
  },
  reducers: {
    // -------------------------------------- add new room  -----------------------------------------

    addRoomReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addRoomSuccess(state, action) {
      return {
        ...state,
        loading: false,
        room: action.payload.room,
        isRoomCreated: true,
      };
    },
    addRoomFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isRoomCreated: false,
      };
    },
    clearRoomCreated(state, action) {
      return {
        ...state,
        isRoomCreated: false,
      };
    },
    // -------------------------------------- Get particular room  -----------------------------------------

    getSingleRoomReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getSingleRoomSuccess(state, action) {
      return {
        ...state,
        loading: false,
        room: action.payload.room,
      };
    },
    getSingleRoomFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    // -------------------------------------- update room  -----------------------------------------

    updateRoomReq(state, action) {
      return {
        ...state,
        loading: true,
        isRoomUpdated: false,
      };
    },
    updateRoomSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isRoomUpdated: true,
        room: action.payload.room,
      };
    },
    updateRoomFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isRoomUpdated: false,
      };
    },
    clearRoomUpdated(state, action) {
      return {
        ...state,
        isRoomUpdated: false,
      };
    },
    // -------------------------------------- delete room  -----------------------------------------

    deleteRoomReq(state, action) {
      return {
        ...state,
        loading: false,
        isRoomDeleted: false,
      };
    },
    deleteRoomSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isRoomDeleted: true,
      };
    },
    deleteRoomFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isRoomDeleted: false,
      };
    },
    clearRoomDeleted(state, action) {
      return {
        ...state,
        isRoomDeleted: false,
      };
    },
  },
  // -------------------------------------- Get all rooms  -----------------------------------------
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.rooms;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = roomSlice;

export const {
  addRoomReq,
  addRoomSuccess,
  addRoomFail,
  clearRoomCreated,
  getAllRoomReq,
  getAllRoomSuccess,
  getAllRoomFail,
  getSingleRoomReq,
  getSingleRoomSuccess,
  getSingleRoomFail,
  updateRoomReq,
  updateRoomSuccess,
  updateRoomFail,
  clearRoomUpdated,
  deleteRoomReq,
  deleteRoomSuccess,
  deleteRoomFail,
  clearRoomDeleted,
} = actions;

export default reducer;
