import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHits } from '../../../actions/actionCreator';
import Card from '../Card/Card';
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';

export default function Hits() {
  const dispatch = useDispatch();
  const hits = useSelector(state => state.hits.hits);
  const loading = useSelector(state => state.hits.loading);
  const alert = useSelector(state => state.hits.alert);

   useEffect(() => {
    dispatch(fetchHits());
  }, [dispatch]);

  if (alert) return <Alert text={alert} vision={'danger'} />
  if (loading) return <Loader />
  if (!hits.length) return <Alert text={'Все разобрали'} vision={'warning'} />

  return hits && hits.map(hit => <Card hit={hit} key={hit.id} />)
}