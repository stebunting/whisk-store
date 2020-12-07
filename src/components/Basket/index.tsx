// Requirements
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Redux Actions
import { updateBasket, removeItemFromBasket } from '../../redux/actions/basketActions';
import { updateValidityAll } from '../../redux/actions/checkoutFormActions';

// Functions
import { validateAll } from '../../functions/validate';
import { sendOrder, checkSwishStatus } from '../../functions/apiCalls';
import { addItemToBasketGaEvent, removeItemFromBasketGaEvent, purchaseGaEvent } from '../../functions/gaEcommerce';

// Types
import {
  productType,
  basketType,
  validityType,
  userType
} from '../../functions/types';

// Components
import BasketSummary from './BasketSummary';
import AddressEntry from '../AddressEntry';
import DetailsEntry from '../DetailsEntry';
import PaymentEntry from '../PaymentEntry';
import Loading from '../Loading';

function Basket({
  user,
  products,
  basket,
  validity,
  updateBasketAction,
  removeItemFromBasketAction,
  updateValidityAllAction
}) {
  const history = useHistory();
  console.log(basket);

  // Set Page Details
  const metadata = useHeaders({
    header: 'Basket',
    title: 'Whisk Store | Basket',
    description: 'Whisk Basket'
  });

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
      productSlug: item.productSlug,
      deliveryType: item.deliveryType,
      deliveryDate: item.deliveryDate
    };
    const newQuantity = parseInt(value, 10) || 0;
    const quantityChange = newQuantity - item.quantity;
    switch (action) {
      case 'update':
        updateBasketAction({
          ...payload,
          quantity: parseInt(value, 10)
        });
        if (quantityChange > 0) {
          addItemToBasketGaEvent(item, Math.abs(quantityChange));
        } else if (quantityChange < 0) {
          removeItemFromBasketGaEvent(item, Math.abs(quantityChange));
        }
        break;

      case 'remove':
        removeItemFromBasketAction(payload);
        removeItemFromBasketGaEvent(item, Math.abs(quantityChange));
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
        purchaseGaEvent(basket.items, basket.statement.bottomLine, swish.payeePaymentReference);
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
        purchaseGaEvent(basket.items, basket.statement.bottomLine, data.orderId);
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

const mapDispatchToProps = {
  updateBasketAction: updateBasket,
  removeItemFromBasketAction: removeItemFromBasket,
  updateValidityAllAction: updateValidityAll
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
