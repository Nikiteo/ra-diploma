import React from 'react';
import Catalog from '../../catalog/Catalog/Catalog';

export default function CatalogPage() {
  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog hasSearch={true}/>
      </section>
    </>
  );
}