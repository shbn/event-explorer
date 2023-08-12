import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import eventReducer from "./reducers/eventReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  event: eventReducer,
});

export default rootReducer;
