import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { categoriesReducer } from './categoriesReducer';
import { hitsReducer } from './hitsReducer';
import { productReducer } from './productReducer';
import { productsReducer } from './productsReducer';

export const rootReducer = combineReducers({
  hits: hitsReducer,
  categories: categoriesReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
});