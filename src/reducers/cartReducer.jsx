import { CART_LENGTH, CART_PRODUCTS, CART_SUM } from "../actions/actionTypes";

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
    default: return state
  }
}