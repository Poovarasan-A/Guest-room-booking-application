import { createSlice } from "@reduxjs/toolkit";
import { loggedUser } from "../actions/userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    isUserUpdated: false,
    user: {},
  },
  reducers: {
    //---------------------------- Create new user --------------------------------------
    registerReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //---------------------------- Login user --------------------------------------
    loginReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearLoginErr(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    loadUserReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateUserReq(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserUpdated: true,
        user: action.payload.user,
      };
    },
    updateUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUserUpdated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loggedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loggedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { actions, reducer } = userSlice;

export const {
  registerReq,
  registerSuccess,
  registerFail,
  loginReq,
  loginSuccess,
  loginFail,
  clearLoginErr,
  updateUserReq,
  updateUserSuccess,
  updateUserFail,
  loadUserReq,
  loadUserSuccess,
  loadUserFail,
} = actions;

export default reducer;
