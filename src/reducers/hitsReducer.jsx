import { HITS_HIDE_ALERT, HITS_HIDE_LOADER, HITS_FETCH_SUCCESS, HITS_SHOW_ALERT, HITS_SHOW_LOADER } from "../actions/actionTypes";

const initialState = {
  hits: [],
  loading: false,
  alert: null,
};

export const hitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HITS_SHOW_LOADER:
      return { ...state, loading: true }
    case HITS_HIDE_LOADER:
      return { ...state, loading: false }
    case HITS_SHOW_ALERT:
      return { ...state, alert: action.payload }
    case HITS_HIDE_ALERT:
      return { ...state, alert: null }
    case HITS_FETCH_SUCCESS:
      return { ...state, hits: action.payload }
    default: return state
  }
}

