import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useBasket from '../../hooks/useBasket';

function ProductList({ products }) {
  const basket = useBasket();

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
  products: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default ProductList;
