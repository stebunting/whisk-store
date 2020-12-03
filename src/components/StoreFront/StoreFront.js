// Requirements
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Types
import { productType } from '../../functions/types';

// Components
import Loading from '../Loading/Loading';

// Style
import css from './storeFront.module.less';

function StoreFront({
  products
}) {
  // Set Page Details
  const metadata = useHeaders({
    header: 'Store',
    title: 'Whisk Store',
    description: 'Whisk Store Front'
  });
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
  products: PropTypes.arrayOf(productType).isRequired
};

function mapStateToProps({ products }) {
  return { products };
}

export default connect(mapStateToProps)(StoreFront);
