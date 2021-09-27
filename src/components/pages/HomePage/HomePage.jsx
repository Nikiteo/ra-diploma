import React from 'react';
import Catalog from '../../catalog/Catalog/Catalog';
import Hits from '../../other/Hits/Hits';

export default function HomePage() {
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="container-xl d-flex justify-content-center">
          <Hits />
        </div>
      </section>

      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog hasSearch={false}/>
      </section>
    </>
  );
}