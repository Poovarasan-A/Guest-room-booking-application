import { createSlice } from "@reduxjs/toolkit";
import { getProperties } from "../actions/propertyAction";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    loading: false,
    isPropertyCreated: false,
    isPropertyUpdated: false,
    isPropertyDeleted: false,
    isRoomCreated: false,
  },
  reducers: {
    // -------------------------------------- Add new property  -----------------------------------------

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
    // -------------------------------------- Get particular property  -----------------------------------------

    getSinglePropertyReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getSinglePropertySuccess(state, action) {
      return {
        ...state,
        loading: false,
        property: action.payload.property,
      };
    },
    getSinglePropertyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    // -------------------------------------- get owner's property  -----------------------------------------

    getOwnerPropertySuccess(state, action) {
      return {
        ...state,
        loadin: false,
        properties: action.payload.properties,
      };
    },
    getOnwerPropertyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    // -------------------------------------- Update property  -----------------------------------------

    updatePropertyReq(state, action) {
      return {
        ...state,
        loading: true,
        isPropertyUpdated: false,
      };
    },
    updatePropertySuccess(state, action) {
      return {
        ...state,
        loading: false,
        isPropertyUpdated: true,
        property: action.payload.property,
      };
    },
    updatePropertyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isPropertyUpdated: false,
      };
    },
    clearPropertyUpdated(state, action) {
      return {
        ...state,
        isPropertyUpdated: false,
      };
    },
    // -------------------------------------- delete property  -----------------------------------------

    deletePropertyReq(state, action) {
      return {
        ...state,
        loading: false,
        isPropertyDeleted: false,
      };
    },
    deletePropertySuccess(state, action) {
      return {
        ...state,
        loading: false,
        isPropertyDeleted: true,
      };
    },
    deletePropertyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearPropertyDeleted(state, action) {
      return {
        ...state,
        isPropertyDeleted: false,
      };
    },
  },
  // -------------------------------------- get all properties  -----------------------------------------

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
  getSinglePropertyReq,
  getSinglePropertySuccess,
  getSinglePropertyFail,
  getOwnerPropertySuccess,
  getOnwerPropertyFail,
  updatePropertyReq,
  updatePropertySuccess,
  updatePropertyFail,
  clearPropertyUpdated,
  deletePropertyReq,
  deletePropertySuccess,
  deletePropertyFail,
  clearPropertyDeleted,
} = actions;

export default reducer;
