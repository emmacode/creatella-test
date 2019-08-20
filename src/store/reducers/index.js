import { combineReducers } from "redux";

import productsReducer from "./products";

import cartReducer from "./products";

//import * as products from "./products";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

export default rootReducer;
