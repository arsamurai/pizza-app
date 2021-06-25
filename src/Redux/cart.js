const ADD_PIZZA = "ADD-PIZZA";
const CLEAR_CART = "CLEAR-CART";
const REMOVE_CART_ITEM = "REMOVE-CART-ITEM";
const PLUS_CART_ITEM = "PLUS-CART-ITEM";
const MINUS_CART_ITEM = "MINUS-CART-ITEM";

let initializationState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

const getTotalPrice = (arr) => arr.reduce((res, obj) => obj.price + res, 0);

const cart = (state = initializationState, action) => {
  switch (action.type) {
    case ADD_PIZZA:
      const curItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: curItems,
          totalPrice: getTotalPrice(curItems),
          totalCount: curItems.length,
        },
      };

      const allPizzas = [].concat.apply(
        [],
        Object.values(newItems).map((obj) => obj.items)
      );

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: {},
        totalCount: 0,
        totalPrice: 0,
      };
    case REMOVE_CART_ITEM:
      const newItem = {
        ...state.items,
      };
      const currentTotalPrice = newItem[action.id].totalPrice;
      const currentTotalCount = newItem[action.id].totalCount;
      delete newItem[action.id];
      return {
        ...state,
        items: newItem,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    case PLUS_CART_ITEM:
      const plusNewItem = [
        ...state.items[action.id].items,
        state.items[action.id].items[0],
      ];

      const allItems = {
        ...state.items,
        [action.id]: {
          items: plusNewItem,
          totalPrice: getTotalPrice(plusNewItem),
          totalCount: state.items[action.id].totalCount + 1,
        },
      };

      const allPlusPizzas = [].concat.apply(
        [],
        Object.values(allItems).map((obj) => obj.items)
      );

      return {
        ...state,
        items: allItems,
        totalCount: allPlusPizzas.length,
        totalPrice: getTotalPrice(allPlusPizzas),
      };
    case MINUS_CART_ITEM:
      const oldItems = state.items[action.id].items;
      const minusNewItems =
        oldItems.length > 1
          ? [...state.items[action.id].items.slice(1)]
          : oldItems;

      const restItems = {
        ...state.items,
        [action.id]: {
          items: minusNewItems,
          totalPrice: getTotalPrice(minusNewItems),
          totalCount: minusNewItems.length,
        },
      };

      const allMinusPizzas = [].concat.apply(
        [],
        Object.values(restItems).map((obj) => obj.items)
      );

      return {
        ...state,
        items: restItems,
        totalCount: allMinusPizzas.length,
        totalPrice: getTotalPrice(allMinusPizzas),
      };
    default:
      return state;
  }
};

export const addPizza = (pizzaObj) => ({
  type: ADD_PIZZA,
  payload: pizzaObj,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const removeCartItem = (id) => ({
  type: REMOVE_CART_ITEM,
  id,
});

export const plusCartItem = (id) => ({
  type: PLUS_CART_ITEM,
  id,
});

export const minusCartItem = (id) => ({
  type: MINUS_CART_ITEM,
  id,
});

export default cart;
