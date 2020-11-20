import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useAutoComplete from '../../hooks/useAutoComplete';
import { getZone } from '../../functions/boundaries';
import { validate, validateAll } from '../../functions/validate';
import { sendOrder, checkSwishStatus } from '../../functions/apiCalls';
import DeliverySelector from './DeliverySelector/DeliverySelector';
import DeliveryDate from './DeliverySelector/DeliveryDate';
import DeliveryEntry from './DeliverySelector/DeliveryEntry';
import DetailsEntry from './DetailsEntry/DetailsEntry';
import PaymentEntry from './PaymentEntry/PaymentEntry';
import * as basketActions from '../../redux/actions/basketActions';
import * as userActions from '../../redux/actions/userActions';
import * as checkoutFormActions from '../../redux/actions/checkoutFormActions';
import { userType, basketType, validityType } from '../../functions/types';

function CheckoutForm({
  user,
  validity,
  basket,
  actions
}) {
  const history = useHistory();
  const [orderStatus, setOrderStatus] = useState('');
  const [errors, setErrors] = useState([]);

  // Set up Google Autocomplete
  const [autoCompleteResult, autoCompleteRef] = useAutoComplete();
  useEffect(() => {
    const formattedAddress = autoCompleteResult.formatted_address || '';
    const latlon = Object.keys(autoCompleteResult).length > 0
      ? autoCompleteResult.geometry.location
      : null;
    const zone = getZone(latlon);
    actions.updateBasketZoneAction({ zone, address: formattedAddress });

    actions.updateUserAddressAction(formattedAddress, zone);
    actions.updateValidityAction(
      'address',
      validate({
        deliverable: basket.delivery.deliverable,
        address: formattedAddress,
        verifiedAddress: formattedAddress,
        zone
      }, 'address', validity.address)
    );
  }, [autoCompleteResult, actions, validity.address, basket.delivery.deliverable]);

  useEffect(() => {
    actions.updateUserAction('deliverable', basket.delivery && basket.delivery.deliverable);
  }, [actions, basket]);

  // Set state on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    actions.updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event) => {
    const { name } = event.target;
    actions.updateValidityAction(name, validate(user, name));
  };

  const fetchSwishStatus = async (swishId, timerId) => {
    const swish = await checkSwishStatus(swishId);
    console.log(swish);
    setOrderStatus(swish.status);
    switch (swish.status) {
      case 'DECLINED':
      case 'ERROR':
      case 'CANCELLED':
        clearInterval(timerId);
        setErrors([...errors, {
          code: swish.errorCode,
          message: swish.errorMessage
        }]);
        console.log(swish);
        break;

      case 'PAID':
        clearInterval(timerId);
        return history.push('/orderconfirmation', { ...swish });

      default:
        break;
    }
  };

  // Submit payment form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const [allValid, validated] = validateAll(user, validity);
    actions.updateValidityAllAction(validated);

    if (allValid) {
      // Send Order to Server
      setOrderStatus('CALLING API');
      const data = await sendOrder(user);
      setOrderStatus(data.status);
      if (data.status === 'PAID') {
        return history.push('/orderconfirmation', { ...data });
      }

      // If Swish Payment Created
      const SWISH_UPDATE_INTERVAL = 2000;
      if (data.status === 'CREATED') {
        const { id: swishId } = data;
        const timerId = setInterval(() => (
          fetchSwishStatus(swishId, timerId)
        ), SWISH_UPDATE_INTERVAL);
      } else {
        setErrors([{
          code: data.errorCode,
          message: data.errorMessage
        }]);
      }
    }
  };

  return (
    <>
      <fieldset className="form-group" id="delivery-details">
        <legend>Delivery</legend>
        <DeliverySelector
          deliveryType={user.deliveryType}
          handleChange={handleChange}
        />
        <DeliveryDate
          deliveryType={user.deliveryType}
          validDate={validity.date}
          handleChange={handleChange}
        />
        {user.deliveryType === 'delivery' && window.googleMapsLoaded && (
          <DeliveryEntry
            address={user.address}
            validAddress={validity.address}
            zone={user.zone}
            deliveryNotes={user.deliveryNotes}
            autoCompleteRef={autoCompleteRef}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
      </fieldset>
      <DetailsEntry
        name={user.name}
        validName={validity.name}
        email={user.email}
        validEmail={validity.email}
        telephone={user.telephone}
        validTelephone={validity.telephone}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <PaymentEntry
        paymentMethod={user.paymentMethod}
        orderStatus={orderStatus}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={(event) => handleSubmit(event)}
      />
    </>
  );
}
CheckoutForm.propTypes = {
  user: userType.isRequired,
  basket: basketType.isRequired,
  validity: validityType.isRequired,
  actions: PropTypes.shape({
    updateBasketZoneAction: PropTypes.func.isRequired,
    updateUserAction: PropTypes.func.isRequired,
    updateUserAddressAction: PropTypes.func.isRequired,
    updateValidityAction: PropTypes.func.isRequired,
    updateValidityAllAction: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ basket, user, validity }) {
  return { basket, user, validity };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateBasketZoneAction: bindActionCreators(basketActions.updateBasketZoneApi, dispatch),
      updateUserAction: bindActionCreators(userActions.updateUser, dispatch),
      updateUserAddressAction: bindActionCreators(userActions.updateUserAddress, dispatch),
      updateValidityAction: bindActionCreators(checkoutFormActions.updateValidity, dispatch),
      updateValidityAllAction: bindActionCreators(checkoutFormActions.updateValidityAll, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
