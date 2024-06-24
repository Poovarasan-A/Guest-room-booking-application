import { createSlice } from "@reduxjs/toolkit";
import { getRooms } from "../actions/roomAction";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    loading: false,
    isRoomCreated: false,
    rooms: [],
  },
  reducers: {
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
  },
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
} = actions;

export default reducer;
