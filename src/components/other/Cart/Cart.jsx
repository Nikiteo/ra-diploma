import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cartProducts, cartSum } from '../../../actions/actionCreator';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const cartSumPrice = useSelector(state => state.cart.sum);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      dispatch(cartProducts(JSON.parse(localStorage.getItem("cart"))));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      dispatch(cartSum(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cart.length ? cart.map((item, index) => (
            <tr key={nanoid()}>
              <th scope="row">{index + 1}</th>
              <td><a href="/products/1.html">{item.title}</a></td>
              <td>{item.sizes}</td>
              <td>{item.quanities}</td>
              <td>
                <NumberFormat value={item.prices} displayType={'text'} thousandSeparator={true} suffix={'₽'} />
              </td>
              <td>
                <NumberFormat value={item.prices * item.quanities} displayType={'text'} thousandSeparator={true} suffix={'₽'} />
              </td>
              <td><button className="btn btn-outline-danger btn-sm">Удалить</button></td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" className="text-center">Корзина пуста</td>
            </tr>
          )}
          {cartSumPrice !== 0 ? (
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>
                <NumberFormat value={cartSumPrice} displayType={'text'} thousandSeparator={true} suffix={'₽'} />
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  )
}