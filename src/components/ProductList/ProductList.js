import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as productActions from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { productType } from '../../functions/types';

function ProductList({ products, basket, actions }) {
  useEffect(() => {
    if (products.length === 0) actions.loadProducts();
    if (!basket.basketId) actions.loadBasket();
  }, [actions, products.length, basket]);

  return (
    <ul>
      <li>
        <Link to="/basket">View Basket</Link>
        {` (${basket.basketId})`}
      </li>
      {products.map((product) => (
        <li key={product.productId}>
          <Link to={`/product/${product.productId}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  );
}
ProductList.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  basket: PropTypes.shape({
    basketId: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    loadProducts: PropTypes.func.isRequired,
    loadBasket: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ products, basket }) {
  return {
    products,
    basket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadBasket: bindActionCreators(basketActions.loadBasket, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
