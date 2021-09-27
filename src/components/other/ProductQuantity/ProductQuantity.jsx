import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { quantityProduct } from '../../../actions/actionCreator';

export default function ProductQuantity({ sizes }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 10;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    dispatch(quantityProduct(quantity));
  }, [dispatch, quantity]);

  const onInc = () => {
    if (quantity < MAX_QUANTITY) setQuantity(quantity + 1);
  }

  const onDec = () => {
    if (quantity > MIN_QUANTITY) setQuantity(quantity - 1);
  }

  return (
    <>
      <span className="btn-group btn-group-sm pl-2">
        <button className="btn btn-secondary" onClick={onDec}>-</button>
        <span className="btn btn-outline-primary">{quantity}</span>
        <button className="btn btn-secondary" onClick={onInc}>+</button>
      </span>
    </>
  );
}