import * as Types from "./types";
import * as endpoints from "../../Services/Endpoints";
import { getQueryParams } from "../../utils";

let CACHED_STORE = {};

//const BASE_URL = "http://locahost:3000/products";

// export const fetchProducts = params => dispatch => {
//   console.log("fetching");
//   fetch(
//     `${endpoints.api.baseURL}${endpoints.api.products}${getQueryParams(
//       params
//     )}`,
//     {
//       method: "GET",
//       headers: { "Content-Type": "application/json" }
//     }
//   )
//     .then(res => res.json())
//     .then(data =>
//       dispatch({
//         type: Types.FETCH_PRODUCTS,
//         payload: data
//       })
//     );
// };

export const fetchProductsPending = isFetchingMore => ({
  type: isFetchingMore
    ? Types.FETCH_MORE_PRODUCTS_PENDING
    : Types.FETCH_PRODUCTS_PENDING
});

export const fetchProductsFulfilled = (payload, isFetchingMore) => ({
  type: isFetchingMore
    ? Types.FETCH_MORE_PRODUCTS_FULFILLED
    : Types.FETCH_PRODUCTS_FULFILLED,
  payload
});

export const fetchProductsError = error => ({
  type: Types.FETCH_PRODUCTS_ERROR,
  error
});

function loadMoreData(params, dispatch) {
  console.log("fetching");
  fetch(
    `${endpoints.api.baseURL}${endpoints.api.products}${getQueryParams(
      params
    )}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    },
    { params: { ...params, _page: params._page + 1 } }
  )
    .then(res => res.json())
    .then(data =>
      dispatch({
        payload: data
      })
    )
    .then(_response => {
      CACHED_STORE[
        getQueryParams({ ...params, _page: params._page + 1 })
      ] = _response;
    });
}

export const fetchProducts = (params, isFetchingMore) => dispatch => {
  dispatch(fetchProductsPending(isFetchingMore));

  //reset cached store if the request is not a load more request
  let key = getQueryParams(params);
  !isFetchingMore && (CACHED_STORE = {});

  //check if the query has been loaded preemptively and load from cached store if true
  //else attempt to send a query to the API
  if (key in CACHED_STORE) {
    dispatch(fetchProductsFulfilled(CACHED_STORE[key], isFetchingMore));
    loadMoreData(params);
  } else {
    //return API({ params })
    return fetch(
      `${endpoints.api.baseURL}${endpoints.api.products}${getQueryParams(
        params
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      },
      { params }
    )
      .then(data => {
        loadMoreData(params);
        dispatch(fetchProductsFulfilled({ payload: data }, isFetchingMore));
      })
      .catch(error => dispatch(fetchProductsError(error)));
  }
};
