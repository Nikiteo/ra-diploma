import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { cartLength } from '../../../actions/actionCreator';
import logo from '../../../img/header-logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const cartLengthStore = useSelector(state => state.cart.length);

  useEffect(() => {
    if (cart) {
      dispatch(cartLength(cart.length));
    }
  }, [cart, cartLengthStore, dispatch]);

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
                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                    <Link to="/cart" className="header-controls-pic header-controls-cart">
                      {cartLengthStore !== 0 && (
                        <div className="header-controls-cart-full">{cartLengthStore}</div>
                      )}
                      <div className="header-controls-cart-menu"></div>
                    </Link>
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