import * as Types from "./types";
import * as endpoint from "../../Services/Endpoints";

//const BASE_URL = "http://locahost:3000/api/products";

export const fetchProductsPending = () => ({
  type: Types.FETCH_PRODUCTS_PENDING
});

export const fetchProductsSucceed = () => dispatch => {
  console.log("fetching");
  fetch(`${endpoint.api.baseURL}${endpoint.api.products}`, { method: "GET" })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: Types.FETCH_PRODUCTS_SUCCEED,
        payload: data
      })
    );
};
