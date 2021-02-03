// Requirements
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Types
import { Product } from '../../types/Product';
import { AppState } from '../../types/AppState';

// Components
import Loading from '../../components/Loading';

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
          Welcome to our Store where you&apos;ll find a wonderful selection of local
          products.
        </p>

        <p>
          With these items we want to highlight circular systems and baking with a conscience.
          If you have any questions, feel free to e-mail us.
        </p>
      </div>

      <ul className={css.productList}>
        {products.filter((product) => product.available).map((product) => (
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

function mapStateToProps({ products }: AppState) {
  return { products };
}

export default connect(mapStateToProps)(StoreFront);
