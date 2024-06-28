import { createSlice } from "@reduxjs/toolkit";
import { loggedUser } from "../actions/userActions";

const userSlice = createSlice({
  name: "user",
  //initial state for slice
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
    //---------------------------- Update user --------------------------------------
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
    //---------------------------- Logout user --------------------------------------

    logoutUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
  // ------------------------------------ Load logged user -------------------------------------
  extraReducers: (builder) => {
    builder
      .addCase(loggedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loggedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
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
  logoutUserSuccess,
  logoutUserFail,
} = actions;

export default reducer;
