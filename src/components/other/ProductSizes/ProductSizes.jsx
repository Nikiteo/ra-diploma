import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sizeProduct, sizeProductDelete } from '../../../actions/actionCreator';

export default function ProductSizes({ sizes }) {
  const dispatch = useDispatch();
  const size = useSelector(state => state.product.size);

  const clickHandler = (handlerSize) => {
    if (size) {
      dispatch(sizeProductDelete());
    } else {
      dispatch(sizeProduct(handlerSize));
    }
  };

  const dysplaySized = sizes
    .filter(s => s.avalible)
    .map((s) => (
      <span
        className={size === s.size ? 'catalog-item-size selected' : 'catalog-item-size'}
        key={s.size}
        onClick={() => clickHandler(s.size)}
      >
        {s.size}
      </span>
    ));

  return (
    <>
      <p>Размеры в наличии: {dysplaySized}</p>
    </>
  );
}