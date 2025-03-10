import { combineReducers } from "@reduxjs/toolkit";
import useReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  user: useReducer,
  cart: cartReducer,
});
export default rootReducer;
