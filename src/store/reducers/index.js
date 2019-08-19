import { combineReducers } from "redux";

import productsReducer from "./products";

//import * as products from "./products";

const rootReducer = combineReducers({
  products: productsReducer
  //...products
});

export default rootReducer;
