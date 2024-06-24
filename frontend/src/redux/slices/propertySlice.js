import { createSlice } from "@reduxjs/toolkit";
import { getProperties } from "../actions/propertyAction";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    loading: false,
    isPropertyCreated: false,
    isRoomCreated: false,
  },
  reducers: {
    addPropertyReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addPropertySuccess(state, action) {
      return {
        ...state,
        loading: false,
        property: action.payload.property,
        isPropertyCreated: true,
      };
    },
    addPropertyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isPropertyCreated: false,
      };
    },
    clearPropertyCreated(state, action) {
      return {
        ...state,
        isPropertyCreated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = propertySlice;

export const {
  addPropertyReq,
  addPropertySuccess,
  addPropertyFail,
  clearPropertyCreated,
} = actions;

export default reducer;
