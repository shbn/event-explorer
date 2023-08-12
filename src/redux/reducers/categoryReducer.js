// import axios from "axios";
// import { API_KEY } from "../../constants";

// Action types
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

// Initial state
const initialState = {
  categories: [],
  error: null,
};

// Reducer function
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
