import * as Types from "./types";
import * as endpoints from "../../Services/Endpoints";
import { getQueryParams } from "../../utils";

let CACHED_STORE = {};

export const fetchProductsPending = isFetchingMore => ({
  type: isFetchingMore
    ? Types.FETCH_MORE_PRODUCTS_PENDING
    : Types.FETCH_PRODUCTS_PENDING
});

export const fetchProductsError = error => ({
  type: Types.FETCH_PRODUCTS_ERROR,
  error
});

export const fetchProductsFulfilled = (payload, isFetchingMore) => ({
  type: isFetchingMore
    ? Types.FETCH_MORE_PRODUCTS_FULFILLED
    : Types.FETCH_PRODUCTS_FULFILLED,
  payload
});

function loadMoreData(params) {
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
    console.log("1");
    dispatch(fetchProductsFulfilled(CACHED_STORE[key], isFetchingMore));
    loadMoreData(params);
  } else {
    console.log("2");
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
      .then(res => res.json())
      .then(data => {
        loadMoreData(params);
        dispatch(fetchProductsFulfilled(data, isFetchingMore));
      })
      .catch(error => dispatch(fetchProductsError(error)));
  }
};
