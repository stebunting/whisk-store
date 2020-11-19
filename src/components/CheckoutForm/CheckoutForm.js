import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useAutoComplete from '../../hooks/useAutoComplete';
import useScript from '../../hooks/useScript';
import { initialiseBoundaries, getZone } from '../../functions/boundaries';
import { validate, validateAll } from '../../functions/validate';
import { sendOrder, checkSwishStatus } from '../../functions/apiCalls';
import DeliverySelector from './DeliverySelector/DeliverySelector';
import DeliveryDate from './DeliverySelector/DeliveryDate';
import DeliveryEntry from './DeliverySelector/DeliveryEntry';
import DetailsEntry from './DetailsEntry/DetailsEntry';
import PaymentEntry from './PaymentEntry/PaymentEntry';
import * as basketActions from '../../redux/actions/basketActions';
import { basketType } from '../../functions/types';

function CheckoutForm({ basket, actions }) {
  const history = useHistory();

  // Load google maps script, initialise boundaries onLoad
  window.googleMapsLoaded = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry&callback=initMap`,
    initialiseBoundaries
  );

  // Initialise form state
  const [formDetails, setFormDetails] = useState({
    deliveryType: 'collection',
    paymentMethod: 'swish',
    date: 'undefined',
    address: '',
    verifiedAddress: null,
    zone: -1,
    deliverable: false,
    deliveryNotes: '',
    name: '',
    email: '',
    telephone: ''
  });
  const [validity, setValidity] = useState({
    date: null,
    address: null,
    name: null,
    email: null,
    telephone: null
  });
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
    actions.updateBasketZone({ zone, address: formattedAddress });

    setFormDetails((prevState) => ({
      ...prevState,
      address: formattedAddress,
      verifiedAddress: formattedAddress,
      zone
    }));
    setValidity((prevState) => ({
      ...prevState,
      ...validate({
        address: formattedAddress,
        verifiedAddress: formattedAddress,
        zone
      }, 'address', prevState.address)[1]
    }));
  }, [autoCompleteResult, actions]);

  useEffect(() => {
    const deliverable = basket.delivery && basket.delivery.deliverable;
    setFormDetails((prevState) => ({ ...prevState, deliverable }));
  }, [basket]);

  // Set state on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails({
      ...formDetails,
      [name]: value
    });
  };

  // Validate input field when moving away
  const handleBlur = (event) => {
    const { name } = event.target;
    setValidity(Object.prototype.hasOwnProperty.call(validity, [name])
      ? { ...validity, ...validate(formDetails, name)[1] }
      : validity);
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
    const [allValid, validated] = validateAll(formDetails, validity);
    setValidity(validated);

    if (allValid) {
      // Send Order to Server
      setOrderStatus('CALLING API');
      const data = await sendOrder(formDetails);
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
          deliveryType={formDetails.deliveryType}
          handleChange={handleChange}
        />
        <DeliveryDate
          deliveryType={formDetails.deliveryType}
          validDate={validity.date}
          handleChange={handleChange}
        />
        {formDetails.deliveryType === 'delivery' && window.googleMapsLoaded && (
          <DeliveryEntry
            address={formDetails.address}
            validAddress={validity.address}
            zone={formDetails.zone}
            deliveryNotes={formDetails.deliveryNotes}
            autoCompleteRef={autoCompleteRef}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
      </fieldset>
      <DetailsEntry
        name={formDetails.name}
        validName={validity.name}
        email={formDetails.email}
        validEmail={validity.email}
        telephone={formDetails.telephone}
        validTelephone={validity.telephone}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <PaymentEntry
        paymentMethod={formDetails.paymentMethod}
        orderStatus={orderStatus}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={(event) => handleSubmit(event)}
      />
    </>
  );
}
CheckoutForm.propTypes = {
  basket: basketType.isRequired,
  actions: PropTypes.shape({
    updateBasketZone: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ basket }) {
  return {
    basket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateBasketZone: bindActionCreators(basketActions.updateBasketZoneApi, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
