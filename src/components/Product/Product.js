import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import useTitle from '../../hooks/useTitle';
import * as productActions from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { priceFormat } from '../../functions/helpers';
import { productType, basketType } from '../../functions/types';
import QuantityDropdown from '../Basket/QuantityDropdown';
import css from './product.module.less';

function Product({
  products,
  product,
  basket,
  actions
}) {
  useTitle(product.name);
  const history = useHistory();
  useEffect(() => {
    if (products.length === 0) {
      actions.loadProducts();
    } else if (product.productId === '') {
      history.push('/');
    }
  }, [actions, products.length, product.productId, history]);

  useEffect(() => {
    if (!basket.basketId) actions.loadBasket();
  }, [actions, basket]);

  const [quantity, setQuantity] = useState(1);

  const basketItem = basket.items
    .filter((item) => item.productId === product.productId);
  const quantityInBasket = basketItem.length > 0
    ? basketItem[0].quantity
    : 0;

  function handleClick() {
    actions.updateBasket(product.productId, quantityInBasket + quantity);
    setQuantity(1);
    history.push('/basket');
  }

  return (
    <>
      <ul className={css.productImages}>
        {product.images.map((image) => (
          <li key={image.url}>
            <img
              className={css.productImage}
              src={`/store/images/${image.url}`}
              alt={image.description}
            />
          </li>
        ))}
      </ul>

      <div className={css.description}>
        {product.description}
      </div>

      <p>{priceFormat(product.grossPrice)}</p>

      <form id="update-basket">
        <div className="form-row">
          <div className="col-sm-2">
            <QuantityDropdown
              defaultValue={quantity}
              name="updateQuantity"
              handleChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="col-sm-auto">
            <button
              className="form-control btn btn-secondary btn-sm"
              type="button"
              onClick={handleClick}
            >
              Add to Basket
            </button>
          </div>
        </div>
      </form>
    </>
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
    images: [],
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
