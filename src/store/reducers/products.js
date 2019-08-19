import * as Types from "../actions/types";

const initialState = {
  loading: false,
  fetchingMore: false,
  hasEndBeenReached: false,
  data: []
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        fetchingMore: false,
        hasEndBeenReached: false,
        data: action.payload || []
      };

    case Types.FETCH_PRODUCTS_FULFILLED:
      return {
        ...state,
        loading: false,
        fetchingMore: false,
        hasEndBeenReached: action.payload.length === 0 ? true : false,
        data: action.payload
      };

    case Types.FETCH_MORE_PRODUCTS_PENDING:
      return {
        ...state,
        loading: false,
        fetchingMore: true,
        hasEndBeenReached: action.payload.length === 0 ? true : false,
        data: action.payload
      };

    case Types.FETCH_MORE_PRODUCTS_FULFILLED:
      return {
        ...state,
        loading: false,
        fetchingMore: false,
        hasEndBeenReached: action.payload.length === 0 ? true : false
      };
    default:
      return state;
  }
};

export default products;
