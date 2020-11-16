import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../../redux/configureStore';
import ProductList from '../ProductList/ProductList';
import Product from '../Product/Product';
import Basket from '../Basket/Basket';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';

function App() {
  const store = configureStore();

  return (
    <ReduxProvider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/basket" component={Basket} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}

export default App;
