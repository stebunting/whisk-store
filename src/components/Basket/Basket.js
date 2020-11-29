/* global dataLayer */
import React, { useState, useEffect } from 'react';
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
import { priceFormat } from '../../functions/helpers';
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

  const sendGaMessage = (orderId) => {
    dataLayer.push({
      event: 'purchase',
      ecommerce: {
        purchase: {
          transaction_id: orderId,
          affiliation: 'Whisk Online Store',
          value: priceFormat(basket.statement.bottomLine.totalPrice, {
            includeOre: true,
            includeSymbol: false
          }),
          tax: priceFormat(basket.statement.bottomLine.totalMoms, {
            includeOre: true,
            includeSymbol: false
          }),
          shipping: priceFormat(basket.statement.bottomLine.totalDelivery, {
            includeOre: true,
            includeSymbol: false
          }),
          currency: 'SEK',
          items: basket.items.map((item) => ({
            item_name: item.details.name,
            item_id: item.productId,
            item_price: priceFormat(item.details.grossPrice, {
              includeSymbol: false,
              includeOre: true
            }),
            item_brand: item.details.brand,
            item_category: item.details.category,
            quantity: item.quantity
          }))
        }
      }
    });
  };

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
  const handleChange = (event, action, item) => {
    const { value } = event.target;
    const payload = {
      productId: item.productId,
      deliveryType: item.deliveryType,
      deliveryDate: item.deliveryDate
    };
    const newQuantity = parseInt(value, 10) || 0;
    const quantityChange = newQuantity - item.quantity;
    const productPayload = {
      items: [{
        item_name: item.details.name,
        item_id: item.productId,
        price: priceFormat(item.details.grossPrice, {
          includeSymbol: false,
          includeOre: true
        }),
        item_brand: item.details.brand,
        item_category: item.details.category,
        quantity: Math.abs(quantityChange)
      }]
    };
    switch (action) {
      case 'update':
        updateBasketAction({
          ...payload,
          quantity: parseInt(value, 10)
        });
        if (quantityChange > 0) {
          dataLayer.push({
            event: 'add_to_cart',
            ecommerce: productPayload
          });
        } else if (quantityChange < 0) {
          dataLayer.push({
            event: 'remove_from_cart',
            ecommerce: productPayload
          });
        }
        break;

      case 'remove':
        removeItemFromBasketAction(payload);
        dataLayer.push({
          event: 'remove_from_cart',
          ecommerce: productPayload
        });
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
        sendGaMessage(swish.payeePaymentReference);
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
        sendGaMessage(data.orderId);
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
