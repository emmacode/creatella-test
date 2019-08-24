import * as Types from "../actions/types";

const initialState = {
  addedItems: [],
  total: 0
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_TO_CART:
      return {
        ...state,
        addedItems: [...state.addedItems, action.id],
        total: state.total + state.addedItems.price
      };
    // return {
    //   ...state,
    //   addedItems: action.id
    // };
    // let addedItem = state.data.find(item => item.id === action.id);
    // let existed_item = state.addedItems.find(item => action.id === item.id);
    // if (existed_item) {
    //   return {
    //     ...state,
    //     total: state.total + addedItem.price
    //   };
    // } else {
    //   addedItem.quantity = 1;
    //   //calculating new total
    //   let newTotal = state.total + addedItem.price;
    //   return {
    //     ...state,
    //     addedItems: [...state.addedItems, addedItem],
    //     total: newTotal
    //   };
    // }

    case Types.REMOVE_ITEM:
      let itemToRemove = state.addedItems.filter(item => item.id !== action.id);
      //calculating total if an item is removed
      let b;
      itemToRemove.map(item => (b = b + item.price));
      //console.log(itemToRemove);
      return {
        ...state,
        addedItems: itemToRemove,
        total: b
      };

    default:
      return state;
  }
};

export default cart;
