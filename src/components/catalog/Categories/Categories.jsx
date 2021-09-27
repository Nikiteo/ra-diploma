/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories, setCategory } from '../../../actions/actionCreator';
import Alert from '../../other/Alert/Alert';
import Loader from '../../other/Loader/Loader';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const categoryId = useSelector(state => state.categories.category);
  const loading = useSelector(state => state.categories.loading);
  const alert = useSelector(state => state.categories.alert);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getLinkClass = (id) => categoryId === id ? "nav-link active" : "nav-link";

  const handleClick = (e, id) => {
    e.preventDefault();
    dispatch(setCategory(id));
  }

  if (alert) return <Alert text={alert} vision={'danger'} />
  if (loading) return <Loader />

  return (
    <>
      <ul className="catalog-categories nav justify-content-center">
        {categories.map(cat => (
          <li className="nav-item" key={cat.id}>
            <a
              className={getLinkClass(cat.id)}
              href="#"
              onClick={(e) => handleClick(e, cat.id)}
            >
              {cat.title}
            </a>
          </li>))
        }
      </ul>
    </>
  );
}