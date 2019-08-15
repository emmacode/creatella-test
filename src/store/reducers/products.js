import * as Types from "../actions/types";

const initialState = {
  loading: false,
  data: []
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        data: []
      };
    case Types.FETCH_PRODUCTS_SUCCEED:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    default:
      return state;
  }
};

export default products;
