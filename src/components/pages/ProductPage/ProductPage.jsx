import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { cartAddProducts, cartProducts, fetchProduct } from '../../../actions/actionCreator';
import Alert from '../../other/Alert/Alert';
import Loader from '../../other/Loader/Loader';
import ProductQuantity from '../../other/ProductQuantity/ProductQuantity';
import ProductSizes from '../../other/ProductSizes/ProductSizes';

export default function ProductPage({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector(state => state.product.product);
  const loading = useSelector(state => state.product.loading);
  const alert = useSelector(state => state.product.alert);
  const size = useSelector(state => state.product.size);
  const quantity = useSelector(state => state.product.quantity);
  const cart = useSelector(state => state.cart.cart);
  const [src, setSrc] = useState();
  const [sizes, setSizes] = useState();
  const [cartArray, setCartArray] = useState([]);

  const id = Number(match.params.id.split('.')[0]);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product.images) {
      try {
        setSrc(product.images[0]);
      } catch (e) {
        setSrc(product.images[1]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product.sizes) {
      setSizes(product.sizes.filter(s => s.avalible).length);
    }
  }, [product]);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      setCartArray(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const handleSaveLocalStorage = (id, title, sizes, quanities, prices) => {
    const cartObject = {
      id, title, sizes, quanities, prices
    }

    let updateCart = [...cartArray, cartObject];
    localStorage.setItem("cart", JSON.stringify(updateCart));
    history.push("/cart");
  };

  if (alert) return <Alert text={alert} vision={'danger'} />
  if (loading) return <Loader />
  if (!product) return <Alert text={'Товаров больше нет'} vision={'warning'} />

  return (
    <>
      {product &&
        <section className="catalog-item">
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={src}
                className="img-fluid" alt=""
                onError={(e) => { e.target.error = null; e.target.src = 'https://via.placeholder.com/420x320/fff/000?text=No image'; }}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{product.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{product.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{product.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{product.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{product.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                {sizes ?
                  <>
                    <ProductSizes sizes={product.sizes} />
                    <p>
                      Количество:
                      <ProductQuantity />
                    </p>
                  </> :
                  <p className="pb-2">Нет в наличии</p>
                }
              </div>
              {size ?
                <button
                className="btn btn-danger btn-block btn-lg"
                onClick={() => handleSaveLocalStorage(product.id, product.title, size, quantity, product.price)}
                >В корзину
                </button> :
                <button disabled className="btn btn-danger btn-block btn-lg">В корзину</button>
              }
            </div>
          </div>
        </section>
      }
    </>
  );
}