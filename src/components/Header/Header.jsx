import { NavLink, Link } from 'react-router-dom';
import logo from '../../img/header-logo.png';

export default function Header() {
  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" exact to="/">
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
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
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