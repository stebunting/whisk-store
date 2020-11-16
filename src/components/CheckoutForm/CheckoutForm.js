import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAutoComplete from '../../hooks/useAutoComplete';
import useScript from '../../hooks/useScript';
import { validate, validateAll } from '../../functions/validate';
import { sendOrder } from '../../functions/apiCalls';
import { getZone, initialiseBoundaries } from '../../functions/boundaries';
import DeliverySelector from './DeliverySelector/DeliverySelector';
import DeliveryDate from './DeliverySelector/DeliveryDate';
import DeliveryEntry from './DeliverySelector/DeliveryEntry';
import DetailsEntry from './DetailsEntry/DetailsEntry';
import PaymentEntry from './PaymentEntry/PaymentEntry';

function CheckoutForm() {
  const history = useHistory();

  // Initialise form state
  const [formDetails, setFormDetails] = useState({
    deliveryType: 'collection',
    paymentMethod: 'swish',
    date: 'undefined',
    address: '',
    verifiedAddress: null,
    zone: -1,
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

  // Set up Google Autocomplete
  const [autoCompleteResult, autoCompleteRef] = useAutoComplete();
  useEffect(() => {
    const formattedAddress = autoCompleteResult.formatted_address || '';
    const latlon = Object.keys(autoCompleteResult).length > 0
      ? autoCompleteResult.geometry.location
      : null;
    const zone = getZone(latlon);
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
      }, 'address')[1]
    }));
  }, [autoCompleteResult]);

  // Load google maps script, initialise boundaries onLoad
  const googleMapsLoaded = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry&callback=initMap`,
    initialiseBoundaries
  );

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

  // Submit payment form
  const handleSubmit = (event) => {
    event.preventDefault();
    const [allValid, validated] = validateAll(formDetails, validity);
    setValidity(validated);
    if (allValid) {
      setOrderStatus('CALLING API');
      sendOrder(formDetails).then((data) => {
        setOrderStatus(data.status);
        if (data.status === 'CONFIRMED') {
          return history.push('/orderconfirmation', { ...data });
        }
      });
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
        {formDetails.deliveryType === 'delivery' && googleMapsLoaded && (
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
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CheckoutForm;
