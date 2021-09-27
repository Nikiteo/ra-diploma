import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';

export default function Card({ hit, inCatalog }) {
  const { images, title, price, id } = hit;
  const [src, setSrc] = useState(images[0]);
  const showHover = () => setSrc(images[1]);
  const hideHover = () => setSrc(images[0]);

  const url = `/products/${id}.html`;
  const cardClass = inCatalog ? "card catalog-item-card" : "card";

  return (
    <>
      <div className="col-4 d-flex align-items-stretch">
        <div className={cardClass}>
          <img
            src={src}
            className="card-img-top img-fluid"
            alt={title}
            onMouseOver={showHover}
            onMouseLeave={hideHover}
            onError={(e) => {e.target.error = null; e.target.src = 'https://via.placeholder.com/420x320/fff/fff?text=';}} />
          <div className="card-body d-flex justify-content-between flex-column">
            <p className="card-text card-title">{title}</p>
            <div className="card-bottom">
              <p className="card-text">
                <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'₽'}/>
              </p>
              <NavLink to={url} className="btn btn-outline-primary">Заказать</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}