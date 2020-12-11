// Requirements
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Types
import { Product } from '../../types/Product';
import { ReduxState } from '../../types/ReduxState';

// Components
import Loading from '../Loading';

// Style
import css from './storeFront.module.less';

interface Props {
  products: Array<Product>
}

function StoreFront(props: Props): ReactElement {
  const { products } = props;

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
            key={product.slug}
          >
            <Link to={`/product/${product.slug}`}>
              <img
                className={css.productImage}
                src={`${process.env.ASSETS_LOCATION}/images/${product.images[0].thumb}`}
                alt={product.name}
              />
            </Link>
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function mapStateToProps({ products }: ReduxState) {
  return { products };
}

export default connect(mapStateToProps)(StoreFront);
