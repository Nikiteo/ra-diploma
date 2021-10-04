import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, loadMore } from '../../../actions/actionCreator';
import Alert from '../../other/Alert/Alert';
import Card from '../../other/Card/Card';
import Loader from '../../other/Loader/Loader';

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const categoryId = useSelector(state => state.categories.category);
  const loadMoreBtn = useSelector(state => state.products.loadMore);
  const loading = useSelector(state => state.products.loading);
  const alert = useSelector(state => state.products.alert);
  const search = useSelector(state => state.search);

  useEffect(() => {
    if (search.search) {
      dispatch(fetchProducts(search.search));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, search.search]);

  if (alert) return <Alert text={alert} vision={'danger'} />
  if (loading) return <Loader />
  if (!products.length) return <Alert text={'Товаров больше нет'} vision={'warning'} />

  const loadMoreProducts = (id) => {
    dispatch(loadMore(id));
  }

  return (
    <>
      <div className="row mb-4">
        {products.map(hit => <Card key={hit.id} hit={hit} inCatalog={true} />)}
      </div>
      {loadMoreBtn &&
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => loadMoreProducts(categoryId)}
          >
            Загрузить ещё
          </button>
        </div>
      }
    </>
  );
}