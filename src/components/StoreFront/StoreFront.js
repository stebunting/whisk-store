import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import useTitle from '../../hooks/useTitle';
import * as productActions from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { productType } from '../../functions/types';
import css from './storeFront.module.less';

function StoreFront({ products, basket, actions }) {
  useTitle('Store');
  useEffect(() => {
    if (products.length === 0) actions.loadProducts();
  }, [actions, products.length]);
  useEffect(() => !basket.basketId && actions.loadBasket(), [actions, basket]);

  return (
    <ul className={css.productList}>
      {products.map((product) => (
        <li
          className={css.productItem}
          key={product.productId}
        >
          <Link to={`/product/${product.productId}`}>
            <img
              className={css.productImage}
              src={`/store/images/${product.images[0].url}`}
              alt={product.name}
            />
          </Link>
          <Link to={`/product/${product.productId}`}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
StoreFront.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
