import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { productType, basketType, validityType } from '../../functions/types';
import BasketSummary from './BasketSummary';
import AddressEntry from '../AddressEntry/AddressEntry';
import DetailsEntry from '../DetailsEntry/DetailsEntry';
import PaymentEntry from '../PaymentEntry/PaymentEntry';

function Basket({
  products,
  basket,
  validity,
  actions
}) {
  // Fetch products and basket if not already loaded
  useEffect(() => {
    if (products.length === 0) actions.loadProductsAction();
  }, [actions, products.length]);
  useEffect(() => !basket.basketId && actions.loadBasket(), [actions, basket]);

  // Add reference to product details to basket item
  basket.items = basket.items.map((item) => ({
    ...item,
    details: products.filter((product) => product.productId === item.productId)[0]
  }));

  return (
    <>
      <BasketSummary basket={basket} />
      {basket.items.length > 0 && <AddressEntry />}
      {validity.address && <DetailsEntry />}
      {validity.address && validity.name && validity.email && validity.telephone && (
        <PaymentEntry />
      )}
    </>
  );
}
Basket.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  basket: basketType.isRequired,
  validity: validityType.isRequired,
  actions: PropTypes.shape({
    loadProductsAction: PropTypes.func.isRequired,
    loadBasket: PropTypes.func.isRequired,
    updateBasket: PropTypes.func.isRequired,
    removeItemFromBasket: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ products, basket, validity }) {
  return { products, basket, validity };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProductsAction: bindActionCreators(loadProducts, dispatch),
      loadBasket: bindActionCreators(basketActions.loadBasket, dispatch),
      updateBasket: bindActionCreators(basketActions.updateBasket, dispatch),
      removeItemFromBasket: bindActionCreators(basketActions.removeItemFromBasket, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
