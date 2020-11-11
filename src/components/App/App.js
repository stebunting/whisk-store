import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import Product from '../Product/Product';
import Basket from '../Basket/Basket';

function App() {
  // Get all products on component mount
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') setProductData(data.products);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ProductList products={productData} />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/basket">
          <Basket />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
