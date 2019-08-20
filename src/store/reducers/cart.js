import * as Types from "../actions/types";

const initialState = {
  addedItems: [],
  total: 0
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_TO_CART:
      let addedItem = action.payload.find(item => item.id === action.id);
      let existed_item = state.addedItems.find(item => action.id === item.id);
      if (existed_item) {
        return {
          ...state,
          total: state.total + addedItem.price
        };
      } else {
        addedItem.quantity = 1;
        //calculating new total
        let newTotal = state.total + addedItem.price;
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal
        };
      }

    case Types.REMOVE_ITEM:
      let itemToRemove = state.addedItems.find(item => item.id === action.id);
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      //calculating total if an is removed
      let newTotal2 = state.total - itemToRemove.price;
      //console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotal2
      };

    default:
      return state;
  }
};

export default cart;
