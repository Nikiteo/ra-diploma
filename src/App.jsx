import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import MainLayout from './components/MainLayout/MainLayout';
import HomePage from './components/pages/HomePage/HomePage';
import AboutPage from './components/pages/AboutPage/AboutPage';
import CatalogPage from './components/pages/CatalogPage/CatalogPage';
import ContactPage from './components/pages/ContactPage/ContactPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import Page404 from './components/pages/Page404/Page404';
import Footer from './components/Footer/Footer';

import './App.css';

export default function App() {
  return (
    <Router>
      <Header />
      <MainLayout>
        <Switch>
          <Route exact path="/ra-diploma">
            <Redirect to="/" />
          </Route>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/catalog" component={CatalogPage} />
          <Route path="/contacts" component={ContactPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route component={Page404} />
        </Switch>
      </MainLayout>
      <Footer />
    </Router>
  );
}