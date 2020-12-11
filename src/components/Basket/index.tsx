// Requirements
import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  FormEvent
} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Redux Actions
import {
  updateBasket,
  removeItemFromBasket,
  UpdateBasketAction,
  RemoveItemFromBasketAction
} from '../../redux/actions/basketActions';
import { updateValidityAll, UpdateValidityAllType } from '../../redux/actions/checkoutFormActions';

// Functions
import { validateAll } from '../../functions/validate';
import { sendOrder, checkSwishStatus } from '../../functions/apiCalls';
import { addItemToBasketGaEvent, removeItemFromBasketGaEvent, purchaseGaEvent } from '../../functions/gaEcommerce';

// Types
import { Basket, BasketItem } from '../../types/Basket';
import { Product } from '../../types/Product';
import { User } from '../../types/User';
import { Delivery } from '../../types/Delivery';
import { FormValidity } from '../../types/FormValidity';
import { ReduxState } from '../../types/ReduxState';

// Components
import BasketSummary from './BasketSummary';
import AddressEntry from '../AddressEntry';
import DetailsEntry from '../DetailsEntry';
import PaymentEntry from '../PaymentEntry';
import Loading from '../Loading';

interface Props {
  user: User,
  delivery: Delivery,
  products: Array<Product>,
  basket: Basket,
  validity: FormValidity,
  updateBasketAction: UpdateBasketAction,
  removeItemFromBasketAction: RemoveItemFromBasketAction,
  updateValidityAllAction: UpdateValidityAllType
}

interface Error {
  code: string,
  message: string
}

function Basket(props: Props) {
  const {
    user,
    delivery,
    products,
    basket,
    validity,
    updateBasketAction,
    removeItemFromBasketAction,
    updateValidityAllAction
  } = props;
  const history = useHistory();

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
  const handleChange = (
    event: ChangeEvent<HTMLSelectElement> | MouseEvent<HTMLButtonElement>,
    action: string, item: BasketItem
  ): void => {
    const value = action === 'update' ? event.target.value : 0;
    const payload = {
      productSlug: item.productSlug,
      deliveryType: item.deliveryType,
      deliveryDate: item.deliveryDate
    };
    const newQuantity = parseInt(value, 10);
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
  const [errors, setErrors] = useState([] as Array<Error>);
  const fetchSwishStatus = async (swishId: string) => {
    const SWISH_UPDATE_INTERVAL = 2000;
    const swish = await checkSwishStatus(swishId);
    setOrderStatus(swish.status);
    switch (swish.status) {
      case 'ERROR':
      case 'CANCELLED':
        setErrors((prevState) => (
          swish.errorCode != null && swish.errorMessage != null
            ? [
              ...prevState, {
                code: swish.errorCode,
                message: swish.errorMessage
              }
            ] : prevState
        ));
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
        purchaseGaEvent(basket.items, basket.statement, swish.payeePaymentReference);
        return history.push('/orderconfirmation', { ...swish });

      default:
        setTimeout(() => fetchSwishStatus(swishId), SWISH_UPDATE_INTERVAL);
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
        purchaseGaEvent(basket.items, basket.statement, data.orderId);
        return history.push('/orderconfirmation', { ...data });

      // Swish
      case 'CREATED': {
        const { id: swishId } = data;
        return fetchSwishStatus(swishId);
      }

      // Swish Error
      case 'ERROR': {
        return setErrors((prevState) => (
          data.errorCode != null && data.errorMessage != null
            ? [
              ...prevState, {
                code: data.errorCode,
                message: data.errorMessage
              }
            ] : prevState
        ));
      }

      default:
        return false;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [allValid, validated] = validateAll(user, delivery, validity);
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

function mapStateToProps(state: ReduxState) {
  return {
    user: state.user,
    delivery: state.delivery,
    products: state.products,
    basket: state.basket,
    validity: state.validity
  };
}

const mapDispatchToProps = {
  updateBasketAction: updateBasket,
  removeItemFromBasketAction: removeItemFromBasket,
  updateValidityAllAction: updateValidityAll
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
