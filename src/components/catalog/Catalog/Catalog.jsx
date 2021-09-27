import React from 'react';
import Categories from '../Categories/Categories';
import Product from '../Products/Products';
import Search from '../Search/Search';

export default function Catalog({ hasSearch }) {
  return (
    <>
      {hasSearch && <Search />}
      <Categories />
      <Product />
    </>
  );
}