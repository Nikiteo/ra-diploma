import React from 'react';
import Cart from '../../other/Cart/Cart';
import Order from '../../other/Order/Order';

export default function CartPage() {
  return (
    <>
      <section className="cart">
        <Cart />
      </section>
      <section className="order">
        <Order />
      </section>
    </>
  )
}