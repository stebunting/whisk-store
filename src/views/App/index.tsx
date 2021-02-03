// Requirements
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Hooks
import useScript from '../../hooks/useScript';
import { initialiseBoundaries } from '../../lib/boundaries';

// Redux Actions
import { loadProducts, LoadProductsAction } from '../../lib/redux/actions/productActions';
import { loadBasket, LoadBasketAction } from '../../lib/redux/actions/basketActions';

// Types
import { Product } from '../../types/Product';
import { Basket } from '../../types/Basket';
import { AppState } from '../../types/AppState';

// Components
import StoreFront from '../StoreFront';
import Title from '../../components/Title';
import ProductPage from '../Product';
import BasketPage from '../Basket';
import OrderConfirmation from '../OrderConfirmation';

declare global {
  interface Window {
    googleMapsLoaded: boolean
  }
}

interface Props {
  products: Array<Product>,
  basket: Basket,
  loadProductsAction: LoadProductsAction,
  loadBasketAction: LoadBasketAction
}

function App(props: Props) {
  const {
    products,
    basket,
    loadProductsAction,
    loadBasketAction
  } = props;

  // Load google maps script, initialise boundaries onLoad
  window.googleMapsLoaded = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry&callback=initMap`,
    initialiseBoundaries
  );

  // Load products and basket on first load
  useEffect(() => {
    if (products.length === 0) loadProductsAction();
    if (!basket.basketId) loadBasketAction();
  }, [loadProductsAction, loadBasketAction, products.length, basket]);

  return (
    <Router>
      <Title />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={StoreFront} />
          <Route path="/product/:slug" component={ProductPage} />
          <Route path="/basket" component={BasketPage} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
        </Switch>
      </div>
    </Router>
  );
}

function mapStateToProps(state: AppState) {
  return {
    products: state.products,
    basket: state.basket
  };
}

const mapDispatchToProps = {
  loadProductsAction: loadProducts,
  loadBasketAction: loadBasket
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
