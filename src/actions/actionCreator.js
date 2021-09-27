import axios from 'axios';
import {
  CART_LENGTH,
  CART_PRODUCTS,
  CART_SUM,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_HIDE_LOADER,
  CATEGORIES_SET_CATEGORY,
  CATEGORIES_SHOW_ALERT,
  CATEGORIES_SHOW_LOADER,
  HITS_FETCH_SUCCESS,
  HITS_HIDE_LOADER,
  HITS_SHOW_ALERT,
  HITS_SHOW_LOADER,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_HIDE_LOADER,
  PRODUCTS_HIDE_LOAD_MORE,
  PRODUCTS_SHOW_ALERT,
  PRODUCTS_SHOW_LOADER,
  PRODUCTS_SHOW_LOAD_MORE,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_HIDE_LOADER,
  PRODUCT_QUANTITY,
  PRODUCT_SHOW_ALERT,
  PRODUCT_SHOW_LOADER,
  PRODUCT_SIZE,
  PRODUCT_SIZE_DELETED,
} from './actionTypes';

/** Constants */
const HITS_URL = process.env.REACT_APP_HITS_URL;
const CATEGORIES_URL = process.env.REACT_APP_CATEGORIES_URL;
const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL;
let OFFSET = 6;

/** Hits */
export const fetchHits = () => async dispatch => {
  dispatch({
    type: HITS_SHOW_LOADER
  });
  await axios.get(`${HITS_URL}`)
    .then((res) => dispatch({
      type: HITS_FETCH_SUCCESS,
      payload: res.data,
    }))
    .then(() => dispatch({
      type: HITS_HIDE_LOADER
    }))
    .catch((e) => dispatch({
      type: HITS_SHOW_ALERT,
      payload: `Произошла ошибка! Попробуйте обновить страницу ${e}`,
    }));
}

/** Categories */
export const fetchCategories = () => async dispatch => {
  dispatch({
    type: CATEGORIES_SHOW_LOADER
  });
  await axios.get(`${CATEGORIES_URL}`)
    .then((res) => {
      res.data.unshift({
        id: 0,
        title: "Все"
      });
      dispatch({
        type: CATEGORIES_FETCH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CATEGORIES_HIDE_LOADER
      });
    })
    .catch((e) => dispatch({
      type: CATEGORIES_SHOW_ALERT,
      payload: `Произошла ошибка! Попробуйте обновить страницу ${e}`,
    }))
}

/** Products */
export const fetchProducts = () => async dispatch => {
  dispatch({
    type: PRODUCTS_SHOW_LOADER
  });
  await axios.get(`${PRODUCTS_URL}`)
    .then((res) => {
      dispatch({
        type: PRODUCTS_FETCH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: PRODUCTS_HIDE_LOADER
      });
    })
    .catch((e) => dispatch({
      type: PRODUCTS_SHOW_ALERT,
      payload: `Произошла ошибка! Попробуйте обновить страницу ${e}`,
    }));
}

export const setCategory = (id) => async dispatch => {
  dispatch({
    type: PRODUCTS_SHOW_LOADER
  });
  await axios.get(`${PRODUCTS_URL}?categoryId=${id}`)
    .then((res) => {
      if (res.data.length < 6) {
        dispatch({
          type: PRODUCTS_HIDE_LOAD_MORE
        });
      } else {
        dispatch({
          type: PRODUCTS_SHOW_LOAD_MORE
        });
      }
      dispatch({
        type: PRODUCTS_FETCH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CATEGORIES_SET_CATEGORY,
        payload: id,
      })
      dispatch({
        type: PRODUCTS_HIDE_LOADER
      });
    })
    .catch((e) => dispatch({
      type: PRODUCTS_SHOW_ALERT,
      payload: `Произошла ошибка! Попробуйте обновить страницу ${e}`,
    }));
}

export const loadMore = (id) => async dispatch => {
  dispatch({
    type: PRODUCTS_SHOW_LOADER,
  });
  await axios.get(`${PRODUCTS_URL}?categoryId=${id}&offset=${OFFSET}`)
    .then((res) => {
      OFFSET = OFFSET + 6;
      if (res.data.length < 6) {
        dispatch({
          type: PRODUCTS_HIDE_LOAD_MORE,
        });
      }
      dispatch({
        type: PRODUCTS_FETCH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CATEGORIES_SET_CATEGORY,
        payload: id,
      })
      dispatch({
        type: PRODUCTS_HIDE_LOADER,
      });
    })
    .catch((e) => dispatch({
      type: PRODUCTS_SHOW_ALERT,
      payload: `Произошла ошибка! Попробуйте обновить страницу ${e}`,
    }));
}

/** Product */
export const fetchProduct = (id) => async dispatch => {
  dispatch({
    type: PRODUCT_SHOW_LOADER
  });
  await axios.get(`${PRODUCTS_URL}/${id}`)
    .then((res) => {
      dispatch({
        type: PRODUCT_FETCH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: PRODUCT_HIDE_LOADER
      });
    })
    .catch((e) => dispatch({
      type: PRODUCT_SHOW_ALERT,
      payload: `Произошла ошибка! Попробуйте обновить страницу ${e}`,
    }));
}

export const sizeProduct = (size) => async dispatch => {
  dispatch({
    type: PRODUCT_SIZE,
    payload: size,
  })
}

export const sizeProductDelete = () => async dispatch => {
  dispatch({
    type: PRODUCT_SIZE_DELETED
  })
}

export const quantityProduct = (quantity) => async dispatch => {
  dispatch({
    type: PRODUCT_QUANTITY,
    payload: quantity,
  })
}

/** Cart */
export const cartProducts = (localStorageProducts) => async dispatch => {
  dispatch({
    type: CART_PRODUCTS,
    payload: localStorageProducts,
  });
}

export const cartLength = (length) => async dispatch => {
  dispatch({
    type: CART_LENGTH,
    payload: length,
  })
}

export const cartSum = (cart) => async dispatch => {
  let sumPrice = 0;
  if (cart.length > 1) {
    cart.forEach((item) => (
      sumPrice = Number(sumPrice) + (+item.prices * +item.quanities)));
  } else {
    sumPrice = Number(cart.prices) * Number(cart.quanities);
  }
  dispatch({
    type: CART_SUM,
    payload: sumPrice,
  });
}

export const cartAddProducts = (cart, object, updateCart) => async dispatch => {
  if (cart.length) {
    const indexCart = cart.findIndex((item) => item.id === object.id);
    if (indexCart !== -1) {
      let newCart = [...cart];
      newCart[indexCart] = {
        ...newCart[indexCart],
        quanities: Number(newCart[indexCart].quanities) + Number(object.quanities)
      };
      dispatch({
        type: CART_PRODUCTS,
        payload: newCart,
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      dispatch({
        type: CART_PRODUCTS,
        payload: updateCart,
      });
      localStorage.setItem("cart", JSON.stringify(updateCart));
    }
  } else {
    dispatch({
      type: CART_PRODUCTS,
      payload: updateCart,
    });
    localStorage.setItem("cart", JSON.stringify(updateCart));
  }
}