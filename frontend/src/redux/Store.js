import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import propertyReducer from "./slices/propertySlice";
import roomReducer from "./slices/roomSlices";

const reducer = combineReducers({
  userState: userReducer,
  propertyState: propertyReducer,
  roomState: roomReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
