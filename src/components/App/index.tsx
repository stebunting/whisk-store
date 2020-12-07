// Requirements
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Hooks
import useScript from '../../hooks/useScript';
import { initialiseBoundaries } from '../../functions/boundaries';

// Redux Actions
import { loadProducts } from '../../redux/actions/productActions';
import { loadBasket } from '../../redux/actions/basketActions';
import { productType } from '../../functions/types';

// Components
import StoreFront from '../StoreFront';
import Product from '../Product';
import Basket from '../Basket';
import Title from '../Title';
import OrderConfirmation from '../OrderConfirmation';

function App({
  products,
  basket,
  loadProductsAction,
  loadBasketAction
}) {
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
          <Route path="/product/:slug" component={Product} />
          <Route path="/basket" component={Basket} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
        </Switch>
      </div>
    </Router>
  );
}
App.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  basket: PropTypes.shape({
    basketId: PropTypes.string
  }).isRequired,
  loadProductsAction: PropTypes.func.isRequired,
  loadBasketAction: PropTypes.func.isRequired
};

function mapStateToProps({ products, basket }) {
  return { products, basket };
}

const mapDispatchToProps = {
  loadProductsAction: loadProducts,
  loadBasketAction: loadBasket
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
