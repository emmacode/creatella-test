import * as Types from "../actions/types";
import { insertAdvert } from "../../utils";

const initialState = {
  loading: false,
  error: null,
  fetchingMore: false,
  hasEndBeenReached: false,
  data: [],
  addedItems: []
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
        fetchingMore: false,
        hasEndBeenReached: false,
        data: state.data
      };

    case Types.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        fetchingMore: false,
        hasEndBeenReached: state.hasEndBeenReached,
        data: state.data
      };

    case Types.FETCH_PRODUCTS_FULFILLED:
      let { data: _data } = insertAdvert(state, action, true);
      return {
        ...state,
        loading: false,
        error: null,
        fetchingMore: false,
        hasEndBeenReached: action.payload.length === 0 ? true : false,
        data: _data
      };

    case Types.FETCH_MORE_PRODUCTS_PENDING:
      return {
        ...state,
        loading: false,
        error: null,
        fetchingMore: true,
        hasEndBeenReached: state.hasEndBeenReached,
        data: state.data
      };

    case Types.FETCH_MORE_PRODUCTS_FULFILLED:
      let { data } = insertAdvert(state, action);
      return {
        ...state,
        loading: false,
        error: null,
        fetchingMore: false,
        hasEndBeenReached: action.payload.length === 0 ? true : false,
        data
      };
    default:
      return state;
  }
};

export default products;
