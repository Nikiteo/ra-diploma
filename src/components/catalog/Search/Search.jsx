import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchFieldChange, searchTextStatus } from '../../../actions/actionCreator';

export default function Search() {
  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(searchFieldChange(name, value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(searchTextStatus(searchState.search, true));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input className="form-control" name="search" placeholder="Поиск" value={searchState.search} onChange={onInputChange} />
    </form>
  );
}