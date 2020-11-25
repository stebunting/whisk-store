import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/actions/productActions';
import * as basketActions from '../../redux/actions/basketActions';
import { updateValidityAll } from '../../redux/actions/checkoutFormActions';
import {
  productType,
  basketType,
  validityType,
  userType
} from '../../functions/types';
import { validateAll } from '../../functions/validate';
import useHeaders from '../../hooks/useHeaders';
import { sendOrder, checkSwishStatus } from '../../functions/apiCalls';
import BasketSummary from './BasketSummary';
import AddressEntry from '../AddressEntry/AddressEntry';
import DetailsEntry from '../DetailsEntry/DetailsEntry';
import PaymentEntry from '../PaymentEntry/PaymentEntry';
import Loading from '../Loading/Loading';

function Basket({
  user,
  products,
  basket,
  validity,
  loadProductsAction,
  appendProductToBasketAction,
  loadBasketAction,
  updateBasketAction,
  removeItemFromBasketAction,
  updateValidityAllAction
}) {
  const history = useHistory();

  // Set Page Details
  const metadata = useHeaders({
    header: 'Basket',
    title: 'Whisk Store | Basket',
    description: 'Whisk Basket'
  });

  useEffect(() => (
    products.length === 0 && loadProductsAction()
  ), [loadProductsAction, products.length]);
  useEffect(() => {
    if (!basket.basketId) loadBasketAction();
  }, [loadBasketAction, basket.basketId]);

  // useEffect(() => {
  //   if (basket.basketId && products.length > 0) {
  //     // eslint-disable-next-line no-param-reassign
  //     appendProductToBasketAction(basket.items.map((item) => ({
  //       ...item,
  //       details: products.filter((product) => product.productId === item.productId)[0]
  //     })));
  //   }
  // }, [appendProductToBasketAction, basket.basketId, basket.items.length, products]);

  // Set checkout stage, only adds stages, does not remove
  const [checkoutStage, setCheckoutStage] = useState(0);
  useEffect(() => {
    let stage = 0;
    if (basket.items.length > 0
      && (Object.keys(basket.delivery.details).length === 0 || validity.address)) {
      stage += 1;
      if (validity.name && validity.email && validity.telephone) stage += 1;
    }
    setCheckoutStage((prevState) => Math.max(prevState, stage));
  }, [basket.items.length, basket.delivery.details, validity]);

  // Handle update/delete items from summary
  const handleChange = (event, action, data) => {
    const { value } = event.target;
    const payload = {
      productId: data.productId,
      deliveryType: data.deliveryType,
      deliveryDate: data.deliveryDate
    };
    switch (action) {
      case 'update':
        updateBasketAction({
          ...payload,
          quantity: parseInt(value, 10)
        });
        break;

      case 'remove':
        removeItemFromBasketAction(payload);
        break;

      default:
        break;
    }
  };

  // Check Swish Payment Status
  const [orderStatus, setOrderStatus] = useState('');
  const [errors, setErrors] = useState([]);
  const fetchSwishStatus = async (swishId) => {
    const SWISH_UPDATE_INTERVAL = 2000;
    const swish = await checkSwishStatus(swishId);
    setOrderStatus(swish.status);
    switch (swish.status) {
      case 'ERROR':
      case 'CANCELLED':
        setErrors((prevState) => ([
          ...prevState, {
            code: swish.errorCode,
            message: swish.errorMessage
          }
        ]));
        break;

      case 'DECLINED':
        setErrors((prevState) => ([
          ...prevState, {
            code: 'BE18',
            message: 'Transaction Declined by Purchaser'
          }
        ]));
        break;

      case 'PAID':
        return history.push('/orderconfirmation', { ...swish });

      default:
        return setTimeout(() => fetchSwishStatus(swishId),
          SWISH_UPDATE_INTERVAL);
    }
  };

  // Submit payment form
  const submitForm = async () => {
    // Send Order to Server
    setErrors([]);
    setOrderStatus('CALLING API');

    // Receive data from Server
    const data = await sendOrder(user);
    setOrderStatus(data.status);
    switch (data.status) {
      // Payment Link
      case 'PAID':
        return history.push('/orderconfirmation', { ...data });

      // Swish
      case 'CREATED': {
        const { id: swishId } = data;
        return fetchSwishStatus(swishId);
      }

      // Swish Error
      case 'ERROR': {
        return setErrors((prevState) => ([
          ...prevState, {
            code: data.errorCode,
            message: data.errorMessage
          }
        ]));
      }

      default:
        return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const [allValid, validated] = validateAll(user, validity);
    updateValidityAllAction(validated);
    if (allValid) return submitForm();
    return false;
  };

  return !basket.basketId || products.length === 0 ? <Loading>{metadata}</Loading> : (
    <>
      {metadata}
      <BasketSummary
        basket={basket}
        handleChange={handleChange}
      />
      {checkoutStage >= 0 && <AddressEntry />}
      {checkoutStage >= 1 && <DetailsEntry />}
      {checkoutStage >= 2 && (
        <PaymentEntry
          orderStatus={orderStatus}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
Basket.propTypes = {
  user: userType.isRequired,
  products: PropTypes.arrayOf(productType).isRequired,
  basket: basketType.isRequired,
  validity: validityType.isRequired,
  loadBasketAction: PropTypes.func.isRequired,
  appendProductToBasketAction: PropTypes.func.isRequired,
  loadProductsAction: PropTypes.func.isRequired,
  updateBasketAction: PropTypes.func.isRequired,
  removeItemFromBasketAction: PropTypes.func.isRequired,
  updateValidityAllAction: PropTypes.func.isRequired
};

function mapStateToProps({
  user,
  products,
  basket,
  validity
}) {
  return {
    user,
    products,
    basket,
    validity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadBasketAction: bindActionCreators(basketActions.loadBasket, dispatch),
    appendProductToBasketAction: bindActionCreators(basketActions.appendProductsToBasket, dispatch),
    loadProductsAction: bindActionCreators(loadProducts, dispatch),
    updateBasketAction: bindActionCreators(basketActions.updateBasket, dispatch),
    removeItemFromBasketAction: bindActionCreators(basketActions.removeItemFromBasket, dispatch),
    updateValidityAllAction: bindActionCreators(updateValidityAll, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
