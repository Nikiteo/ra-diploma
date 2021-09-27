import { CATEGORIES_FETCH_SUCCESS, CATEGORIES_SHOW_LOADER, CATEGORIES_HIDE_ALERT, CATEGORIES_HIDE_LOADER, CATEGORIES_SHOW_ALERT, CATEGORIES_SET_CATEGORY } from "../actions/actionTypes";

const initialState = {
  categories: [],
  loading: false,
  alert: null,
  category: 0,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_SHOW_LOADER:
      return { ...state, loading: true }
    case CATEGORIES_HIDE_LOADER:
      return { ...state, loading: false }
    case CATEGORIES_SHOW_ALERT:
      return { ...state, alert: action.payload }
    case CATEGORIES_HIDE_ALERT:
      return { ...state, alert: null }
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.payload }
    case CATEGORIES_SET_CATEGORY:
      return { ...state, category: action.payload }
    default: return state
  }
}
