import { PRODUCT_FETCH_SUCCESS, PRODUCT_HIDE_ALERT, PRODUCT_HIDE_LOADER, PRODUCT_QUANTITY, PRODUCT_SHOW_ALERT, PRODUCT_SHOW_LOADER, PRODUCT_SIZE, PRODUCT_SIZE_DELETED } from "../actions/actionTypes";

const initialState = {
  product: [],
  loading: false,
  alert: null,
  size: null,
  quantity: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SHOW_LOADER:
      return { ...state, loading: true }
    case PRODUCT_HIDE_LOADER:
      return { ...state, loading: false }
    case PRODUCT_SHOW_ALERT:
      return { ...state, alert: action.payload }
    case PRODUCT_HIDE_ALERT:
      return { ...state, alert: null }
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, product: action.payload }
    case PRODUCT_SIZE:
      return { ...state, size: action.payload }
    case PRODUCT_SIZE_DELETED:
      return { ...state, size: null}
    case PRODUCT_QUANTITY:
      return { ...state, quantity: action.payload }
    default: return state
  }
}