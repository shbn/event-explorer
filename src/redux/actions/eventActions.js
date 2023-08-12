import axios from "axios";
import { API_KEY } from "../../constants";

// Define your action types here
export const SEARCH_EVENTS_SUCCESS = "SEARCH_EVENTS_SUCCESS";
export const SEARCH_EVENTS_FAILURE = "SEARCH_EVENTS_FAILURE";

// Define your action creators here

export const searchEventsSuccess = (events) => ({
  type: SEARCH_EVENTS_SUCCESS,
  payload: events,
});

export const searchEventsFailure = (error) => ({
  type: SEARCH_EVENTS_FAILURE,
  payload: error,
});

export const searchEvents = (keyword, category) => async (dispatch) => {
  const params = {
    keyword,
    countryCode: "US",
    apikey: API_KEY,
  };
  if (category) {
    params.classificationName = category;
  }

  try {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params,
      }
    );

    // Dispatch your action with the response data
    dispatch(searchEventsSuccess(response.data._embedded.events));
  } catch (error) {
    console.log(error);
    dispatch(searchEventsFailure(error.message));
    // Handle error
  }
};
