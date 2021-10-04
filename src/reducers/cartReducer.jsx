import { CART_DELETE, CART_LENGTH, CART_PRODUCTS, CART_SUM } from "../actions/actionTypes";

const initialState = {
  cart: [],
  sum: null,
  loading: null,
  alert: null,
  length: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCTS:
      return { ...state, cart: action.payload }
    case CART_LENGTH:
      return { ...state, length: action.payload }
    case CART_SUM:
      return { ...state, sum: action.payload }
    case CART_DELETE:
      const updateCart = state.cart.filter(o => o.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updateCart));
      return {
        ...state,
        cart: updateCart,
      }
    case 'CART_LOCALSTORAGE_CLEAR':
      localStorage.removeItem('cart');
      return { ...state, cart: [] };
    default: return state
  }
}