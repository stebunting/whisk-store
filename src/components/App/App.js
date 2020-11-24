import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../../redux/configureStore';
import useScript from '../../hooks/useScript';
import { initialiseBoundaries } from '../../functions/boundaries';
import StoreFront from '../StoreFront/StoreFront';
import Product from '../Product/Product';
import Basket from '../Basket/Basket';
import Title from '../Title/Title';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';

export const store = configureStore();

function App() {
  // Load google maps script, initialise boundaries onLoad
  window.googleMapsLoaded = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry&callback=initMap`,
    initialiseBoundaries
  );

  return (
    <ReduxProvider store={store}>
      <Router>
        <div className="container-fluid">
          <Title />
          <Switch>
            <Route exact path="/" component={StoreFront} />
            <Route path="/product/:productId" component={Product} />
            <Route path="/basket" component={Basket} />
            <Route path="/orderconfirmation" component={OrderConfirmation} />
          </Switch>
        </div>
      </Router>
    </ReduxProvider>
  );
}

export default App;
