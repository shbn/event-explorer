import {
  SEARCH_EVENTS_SUCCESS,
  SEARCH_EVENTS_FAILURE,
} from "../actions/eventActions";

const initialState = {
  events: [],
  error: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        error: null,
      };
    case SEARCH_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
