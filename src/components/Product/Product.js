import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import useHeaders from '../../hooks/useHeaders';
import { loadProducts } from '../../redux/actions/productActions';
import { loadBasket, updateBasket, appendProductsToBasket } from '../../redux/actions/basketActions';
import { priceFormat, rangeFormat } from '../../functions/helpers';
import { productType, basketType } from '../../functions/types';
import QuantityDropdown from '../Inputs/QuantityDropdown';
import Loading from '../Loading/Loading';
import RadioInline from '../Inputs/RadioInline';
import Select from '../Inputs/Select';
import css from './product.module.less';

function Product({
  products,
  product,
  basket,
  loadProductsAction,
  loadBasketAction,
  updateBasketAction
}) {
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

  const history = useHistory();
  useEffect(() => {
    if (products.length === 0) loadProductsAction();
    else if (product.productId === '') history.push('/');
  }, [loadProductsAction, products.length, product.productId, history]);
  useEffect(() => !basket.basketId && loadBasketAction(), [loadBasketAction, basket]);

  const [basketPayload, setBasketPayload] = useState({
    quantity: '1',
    deliveryType: product.deliveryMethods.length > 0 ? product.deliveryMethods[0] : 'delivery',
    deliveryDate: ''
  });

  const basketItem = basket.items.filter((item) => (
    item.productId === product.productId
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
      productId: product.productId,
      quantity: parseInt(basketPayload.quantity, 10) + quantityInBasket
    });
    setBasketPayload({ ...basketPayload, quantity: '1' });
    history.push('/basket');
  }

  function handleChange(event) {
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

  return products.length === 0 ? <Loading>{metadata}</Loading> : (
    <>
      {metadata}
      <ul className={css.productImages}>
        {product.images.map((image) => (
          <li key={image.url}>
            <a href={`/store/images/${image.url}`}>
              <img
                className={css.productImage}
                src={`/store/images/${image.thumb}`}
                alt={image.description}
              />
            </a>
          </li>
        ))}
      </ul>

      <div className={css.productText}>
        {product.contents && (
          <ul className={css.contentsList}>
            {product.contents.map((item, index) => (
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
                <li key={ingredient.item}>
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
              <a href={`/store/${link.url}`}>
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
              handleClick={handleChange}
            />
            <RadioInline
              id="deliveryType"
              label="Delivery"
              name="delivery"
              checked={basketPayload.deliveryType === 'delivery'}
              handleClick={handleChange}
            />
            <Select
              name="deliveryDate"
              defaultText={`Select a ${basketPayload.deliveryType} option...`}
              options={product[basketPayload.deliveryType].dates.map((range) => ({
                value: `${range.year}-${range.month}-${range.date}-${range.time.start}-${range.time.end}`,
                text: rangeFormat(range)
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
Product.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  product: productType.isRequired,
  basket: basketType.isRequired,
  loadProductsAction: PropTypes.func.isRequired,
  loadBasketAction: PropTypes.func.isRequired,
  updateBasketAction: PropTypes.func.isRequired
};

function mapStateToProps({ products, basket }, ownProps) {
  const { productId } = ownProps.match.params;

  const defaultProduct = {
    productId: '',
    name: '',
    contents: [],
    description: [],
    details: [],
    links: [],
    deliveryMethods: ['email'],
    images: [],
    delivery: {
      dates: []
    },
    collection: {
      dates: []
    },
    grossPrice: 0
  };
  const filteredProducts = products.filter((product) => product.productId === productId);
  const product = filteredProducts.length < 1 ? defaultProduct : filteredProducts[0];

  return { products, product, basket };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProductsAction: bindActionCreators(loadProducts, dispatch),
    loadBasketAction: bindActionCreators(loadBasket, dispatch),
    updateBasketAction: bindActionCreators(updateBasket, dispatch),
    appendProductToBasketAction: bindActionCreators(appendProductsToBasket, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
