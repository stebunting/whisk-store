import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { priceFormat } from '../../functions/helpers';
import { productType, basketType } from '../../functions/types';
import QuantityDropdown from '../Basket/QuantityDropdown';

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

  const [quantity, setQuantity] = useState(1);

  const basketItem = basket.items
    .filter((item) => item.productId === product.productId);
  const quantityInBasket = basketItem.length > 0
    ? basketItem[0].quantity
    : 0;

  function handleSubmit(event) {
    event.preventDefault();
    actions.updateBasket(product.productId, quantityInBasket + quantity);
    setQuantity(1);
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
        <QuantityDropdown
          defaultValue={quantity}
          name="updateQuantity"
          handleChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
        <input
          type="submit"
          name="add-to-basket"
          id="add-to-basket"
          value="Add to Basket"
        />
        <div>
          {quantityInBasket}
          &nbsp;in Basket
        </div>
      </form>
    </ul>
  );
}
Product.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  product: productType.isRequired,
  basket: basketType.isRequired,
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
