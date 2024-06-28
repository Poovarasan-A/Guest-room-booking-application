import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import propertyReducer from "./slices/propertySlice";
import roomReducer from "./slices/roomSlices";
import bookingReducer from "./slices/bookingSlice";

//combine all reducers into a root reducer
const reducer = combineReducers({
  userState: userReducer,
  propertyState: propertyReducer,
  roomState: roomReducer,
  bookingState: bookingReducer,
});

const store = configureStore({
  reducer, //used combined reducers
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //Default middleware setup
});

export default store;
