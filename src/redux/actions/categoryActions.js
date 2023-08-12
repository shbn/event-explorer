import axios from "axios";
import { API_KEY } from "../../constants";

export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/classifications.json`,
      {
        params: {
          apikey: API_KEY,
        },
      }
    );

    dispatch(fetchCategoriesSuccess(response.data._embedded.classifications));
  } catch (error) {
    console.log(error);
    dispatch(fetchCategoriesFailure(error.message));
  }
};
