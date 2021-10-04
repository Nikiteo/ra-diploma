import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { cartLength, cartProducts, searchTextStatus } from '../../../actions/actionCreator';
import classnames from 'classnames';
import logo from '../../../img/header-logo.png';

const DEFAULT_FORM_VALUE = {
  search: '',
};

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const cartLengthStore = useSelector(state => state.cart.length);
  const [searchVisible, setSearchVisible] = useState(true);
  const [form, setForm] = useState(DEFAULT_FORM_VALUE);
  const history = useHistory();

  const searchVisibleClass = classnames({
    'form-inline': true,
    invisible: searchVisible,
  });

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      dispatch(cartProducts(JSON.parse(localStorage.getItem("cart"))));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      dispatch(cartLength(cart.length));
    }
  }, [cart, dispatch]);

  const onSearch = (event) => {
    event.preventDefault();
    if (form.search) {
      dispatch(searchTextStatus(form.search, true));
      setForm(DEFAULT_FORM_VALUE);
      history.push('/catalog');
      setSearchVisible(false);
    } else setSearchVisible(!searchVisible);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" exact={`${true}`} to="/">
                <img src={logo} alt="Bosa Noga" />
              </Link>

              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink to="/" exact className="nav-link" activeClassName="nav-link active">Главная</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/catalog" className="nav-link" activeClassName="nav-link active">Каталог</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/about" className="nav-link" activeClassName="nav-link active">О магазине</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contacts" className="nav-link" activeClassName="nav-link active">Контакты</NavLink>
                  </li>
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={onSearch}
                      onKeyPress={onSearch}
                      role="button"
                      tabIndex="0"
                      aria-label="Search field"
                    />
                    <Link to="/cart" className="header-controls-pic header-controls-cart">
                      {cartLengthStore !== 0 && (
                        <div className="header-controls-cart-full">{cartLengthStore}</div>
                      )}
                      <div className="header-controls-cart-menu"></div>
                    </Link>
                    <form
                      data-id="search-form"
                      className={`header-controls-search-form ${searchVisibleClass}`}
                      onSubmit={onSearch}
                    >
                      <input
                        className="form-control"
                        name="search"
                        placeholder="Поиск"
                        onChange={onInputChange}
                        value={form.search}
                      />
                    </form>
                  </div>
                  <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                    <input className="form-control" placeholder="Поиск" />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}