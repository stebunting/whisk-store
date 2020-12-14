// Requirements
import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Redux Actions
import { updateBasket, UpdateBasketAction } from '../../redux/actions/basketActions';
import { addProductsToStore, AddProductsToStoreAction } from '../../redux/actions/productActions';

// Functions
import { priceFormat, rangeFormat, hasDatePassed } from '../../functions/helpers';
import { viewItemGaEvent, addToBasketGaEvent } from '../../functions/gaEcommerce';

// Types
import { Product } from '../../types/Product';
import { Basket } from '../../types/Basket';
import { ReduxState } from '../../types/ReduxState';

// Components
import QuantityDropdown from '../Inputs/QuantityDropdown';
import Loading from '../Loading';
import RadioInline from '../Inputs/RadioInline';
import Select from '../Inputs/Select';

// Style
import css from './product.module.less';
import { getProduct } from '../../functions/apiCalls';

interface RouterParams {
  slug: string
}

interface Props extends RouteComponentProps<RouterParams> {
  products: Array<Product>
  product: Product,
  basket: Basket,
  updateBasketAction: UpdateBasketAction,
  addProductsToStoreAction: AddProductsToStoreAction
}

function Product(props: Props): ReactElement {
  const {
    products,
    product,
    basket,
    updateBasketAction,
    addProductsToStoreAction,
    match,
    history
  } = props;
  const { slug } = match.params;

  // Set Page Details
  const headerPayload = products.length > 0
    ? {
      header: product.name,
      title: `Whisk Store | ${product.name}`,
      description: `${product.name} // ${product.description}`
    } : {
      header: 'Product',
      title: 'Whisk Store',
      description: 'Whisk Store'
    };
  const metadata = useHeaders(headerPayload);

  useEffect(() => {
    if (products.length > 0 && product.slug === '') {
      getProduct(slug).then((data) => {
        addProductsToStoreAction(data);
        if (data.length === 0) history.push('/');
      });
    }
  }, [slug, products.length, product.slug, history, addProductsToStoreAction]);

  // Send Google Analytics Impression Data
  useEffect(() => {
    if (product.slug !== '') {
      viewItemGaEvent(product);
    }
  }, [product]);

  const [basketPayload, setBasketPayload] = useState({
    quantity: '1',
    deliveryType: product.deliveryMethods.length > 0 ? product.deliveryMethods[0] : 'delivery',
    deliveryDate: ''
  });

  const basketItem = basket.items.filter((item) => (
    item.productSlug === product.slug
    && item.deliveryType === basketPayload.deliveryType
    && item.deliveryDate === basketPayload.deliveryDate
  ));
  const quantityInBasket = basketItem.length > 0
    ? basketItem[0].quantity
    : 0;

  function handleClick() {
    if ((basketPayload.deliveryType === 'collection'
      || basketPayload.deliveryType === 'delivery')
      && basketPayload.deliveryDate === '') return;
    updateBasketAction({
      ...basketPayload,
      productSlug: product.slug,
      quantity: parseInt(basketPayload.quantity, 10) + quantityInBasket
    });
    addToBasketGaEvent(product, parseInt(basketPayload.quantity, 10));
    setBasketPayload({ ...basketPayload, quantity: '1' });
    history.push('/basket');
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = event.target;
    setBasketPayload((prevState) => {
      const retValue = {
        ...prevState,
        [name]: value
      };
      if (name === 'deliveryType') retValue.deliveryDate = '';
      return retValue;
    });
  }

  return product.slug === '' ? <Loading>{metadata}</Loading> : (
    <>
      {metadata}
      <ul className={css.productImages}>
        {product.images.map((image) => (
          <li key={image.url}>
            <a href={`${process.env.ASSETS_LOCATION}/images/${image.url}`}>
              <img
                className={css.productImage}
                src={`${process.env.ASSETS_LOCATION}/images/${image.thumb}`}
                alt={image.description}
              />
            </a>
          </li>
        ))}
      </ul>

      <div className={css.productText}>
        {product.contents && (
          <ul className={css.contentsList}>
            {product.contents.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className={css.price}>
          {priceFormat(product.grossPrice)}
        </div>

        <div className={css.description}>
          {product.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {product.ingredients && (
          <>
            <h3 className={css.productHeader}>Ingredients</h3>
            <ul className={css.ingredientsList}>
              {product.ingredients.map((ingredient) => (
                <li key={`${ingredient.item}${ingredient.details}`}>
                  <strong>{ingredient.item}</strong>
                  {ingredient.item !== '' && ' '}
                  {ingredient.details}
                </li>
              ))}
            </ul>
          </>
        )}

        {product.links && (
          product.links.map((link) => (
            <p key={link.url}>
              {link.text}
              &nbsp;
              (
              <a href={link.url}>
                Click Link Here
              </a>
              )
            </p>
          ))
        )}
      </div>

      <form id="update-basket">
        {(product.deliveryMethods.includes('collection') || product.deliveryMethods.includes('delivery')) && (
          <>
            <RadioInline
              id="deliveryType"
              label="Collection"
              name="collection"
              checked={basketPayload.deliveryType === 'collection'}
              handleChange={handleChange}
            />
            <RadioInline
              id="deliveryType"
              label="Delivery"
              name="delivery"
              checked={basketPayload.deliveryType === 'delivery'}
              handleChange={handleChange}
            />
            <Select
              name="deliveryDate"
              defaultText={`Select a ${basketPayload.deliveryType} option...`}
              options={product[basketPayload.deliveryType].dates.map((range) => ({
                value: `${range.year}-${range.month}-${range.date}-${range.time.start}-${range.time.end}`,
                text: rangeFormat(range),
                disabled: range.deadline && hasDatePassed(range.deadline)
              }))}
              value={basketPayload.deliveryDate}
              handleChange={handleChange}
            />
          </>
        )}
        <div className="form-row">
          <div className="col-sm-2">
            <QuantityDropdown
              strValue={basketPayload.quantity}
              name="quantity"
              handleChange={handleChange}
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

function mapStateToProps(
  state: ReduxState, ownProps: RouteComponentProps<RouterParams>
) {
  const { slug } = ownProps.match.params;

  const defaultProduct: Product = {
    name: '',
    slug: '',
    productId: '',
    available: false,
    contents: [],
    description: [],
    ingredients: [],
    links: [],
    deliveryMethods: [],
    images: [],
    delivery: {
      dates: [],
      costs: {},
      maxZone: 0
    },
    collection: {
      dates: []
    },
    grossPrice: 0
  };

  // Check if product in store
  const filteredProducts = state.products.filter((productInStore) => (
    productInStore.slug === slug || productInStore.productId === slug
  ));
  const product = filteredProducts.length < 1 ? defaultProduct : filteredProducts[0];

  return {
    products: state.products,
    product,
    basket: state.basket
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateBasketAction: bindActionCreators(updateBasket, dispatch),
    addProductsToStoreAction: bindActionCreators(addProductsToStore, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
