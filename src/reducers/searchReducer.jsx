import { SEARCH_FIELD_CHANGE, SEARCH_TEXT_STATUS } from "../actions/actionTypes";

const initialState = {
  search: '',
  searchStatus: false,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FIELD_CHANGE: {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    }
    case SEARCH_TEXT_STATUS: {
      const { search, searchStatus } = action.payload;
      return { ...state, search, searchStatus };
    }
    default: return state;
  }
}

