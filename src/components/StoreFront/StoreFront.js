import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import useHeaders from '../../hooks/useHeaders';
import { loadProducts } from '../../redux/actions/productActions';
import { loadBasket } from '../../redux/actions/basketActions';
import { productType } from '../../functions/types';
import Loading from '../Loading/Loading';
import css from './storeFront.module.less';

function StoreFront({
  products,
  basket,
  loadProductsAction,
  loadBasketAction
}) {
  // Set Page Details
  const metadata = useHeaders({
    header: 'Store',
    title: 'Whisk Store',
    description: 'Whisk Store Front'
  });

  useEffect(() => {
    if (products.length === 0) loadProductsAction();
  }, [loadProductsAction, products.length]);
  useEffect(() => !basket.basketId && loadBasketAction(), [loadBasketAction, basket]);

  return products.length === 0 ? <Loading>{metadata}</Loading> : (
    <>
      {metadata}

      <div className={css.welcomeText}>
        <p>
          Welcome to our Christmas Store where you&apos;ll find a wonderful selection of local
          products.
        </p>

        <p>
          With these items we want to highlight circular systems (how cool is the bag
          from Reuse Remade?), bio-dynamic vegetables and baking with a conscience. If you have
          any questions, feel free to e-mail us.
        </p>
      </div>

      <ul className={css.productList}>
        {products.map((product) => (
          <li
            className={css.productItem}
            key={product.productId}
          >
            <Link to={`/product/${product.productId}`}>
              <img
                className={css.productImage}
                src={`${process.env.ASSETS_LOCATION}/images/${product.images[0].thumb}`}
                alt={product.name}
              />
            </Link>
            <Link to={`/product/${product.productId}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
StoreFront.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  basket: PropTypes.shape({
    basketId: PropTypes.string
  }).isRequired,
  loadProductsAction: PropTypes.func.isRequired,
  loadBasketAction: PropTypes.func.isRequired
};

function mapStateToProps({ products, basket }) {
  return { products, basket };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProductsAction: bindActionCreators(loadProducts, dispatch),
    loadBasketAction: bindActionCreators(loadBasket, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
