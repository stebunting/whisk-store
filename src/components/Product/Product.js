import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { priceFormat } from '../../helpers';
import { productType } from '../../types';

function Product({
  products,
  product,
  basket,
  actions
}) {
  useEffect(() => {
    if (products.length === 0) actions.loadProducts();
    if (!basket.basketId) actions.loadBasket();
  }, [actions, products.length, basket]);

  const [quantity, setQuantity] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    actions.updateBasket(product.productId, quantity);
  }

  return (
    <ul>
      <li>
        <Link to="/basket">View Basket</Link>
        {` (${basket.basketId})`}
      </li>
      <li><h2>{product.name}</h2></li>
      <li>{product.description}</li>
      <li>{priceFormat(product.grossPrice)}</li>
      <form id="update-basket" onSubmit={handleSubmit}>
        <label htmlFor="updateQuantity">
          Quantity
          <input
            type="number"
            name="updateQuantity"
            id="updateQuantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
          <input
            type="submit"
            name="add-to-basket"
            id="add-to-basket"
            value="Add to Basket"
          />
        </label>
      </form>
    </ul>
  );
}
Product.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  product: productType.isRequired,
  basket: PropTypes.shape({
    basketId: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    loadProducts: PropTypes.func.isRequired,
    loadBasket: PropTypes.func.isRequired,
    updateBasket: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ products, basket }, ownProps) {
  const { productId } = ownProps.match.params;

  const defaultProduct = {
    productId: '',
    name: '',
    description: '',
    grossPrice: 0
  };
  const filteredProducts = products.filter((product) => product.productId === productId);
  const product = filteredProducts.length < 1 ? defaultProduct : filteredProducts[0];

  return {
    products,
    product,
    basket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadBasket: bindActionCreators(basketActions.loadBasket, dispatch),
      updateBasket: bindActionCreators(basketActions.updateBasket, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
