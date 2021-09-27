import { PRODUCTS_FETCH_SUCCESS, PRODUCTS_HIDE_ALERT, PRODUCTS_HIDE_LOADER, PRODUCTS_HIDE_LOAD_MORE, PRODUCTS_SHOW_ALERT, PRODUCTS_SHOW_LOADER, PRODUCTS_SHOW_LOAD_MORE } from "../actions/actionTypes";

const initialState = {
  products: [],
  loading: false,
  alert: null,
  loadMore: true,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SHOW_LOADER:
      return { ...state, loading: true }
    case PRODUCTS_HIDE_LOADER:
      return { ...state, loading: false }
    case PRODUCTS_SHOW_ALERT:
      return { ...state, alert: action.payload }
    case PRODUCTS_HIDE_ALERT:
      return { ...state, alert: null }
    case PRODUCTS_FETCH_SUCCESS:
      return { ...state, products: action.payload }
    case PRODUCTS_HIDE_LOAD_MORE:
      return { ...state, loadMore: false }
    case PRODUCTS_SHOW_LOAD_MORE:
      return { ...state, loadMore: true }
    default: return state
  }
}