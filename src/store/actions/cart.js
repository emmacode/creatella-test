import * as Types from "./types";

export const addToCart = id => ({
  type: Types.ADD_TO_CART,
  id
});

export const removeItem = id => ({
  type: Types.REMOVE_ITEM,
  id
});
