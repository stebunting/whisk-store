import React, { useState, useEffect } from 'react';
import useAutoComplete from '../../hooks/useAutoComplete';
import DeliverySelector from './DeliverySelector/DeliverySelector';
import DeliveryDate from './DeliverySelector/DeliveryDate';
import DeliveryEntry from './DeliverySelector/DeliveryEntry';
import DetailsEntry from './DetailsEntry/DetailsEntry';
import PaymentEntry from './PaymentEntry/PaymentEntry';
import { validate, validateAll } from '../../helpers/validate';

function CheckoutForm() {
  // Initialise form state
  const [formDetails, setFormDetails] = useState({
    deliveryType: 'collection',
    paymentMethod: 'swish',
    date: 'undefined',
    address: '',
    verifiedAddress: null,
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

  // Set up Google Autocomplete
  const [autoCompleteResult, autoCompleteRef] = useAutoComplete();
  useEffect(() => {
    setFormDetails((prevState) => ({
      ...prevState,
      address: autoCompleteResult,
      verifiedAddress: autoCompleteResult
    }));
  }, [autoCompleteResult]);

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
      console.log('SUBMITTING');
    } else {
      console.log('FAILED VALIDATION');
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
        {formDetails.deliveryType === 'delivery' && window.googleApiLoaded && (
          <DeliveryEntry
            address={formDetails.address}
            validAddress={validity.address}
            deliveryNotes={formDetails.deliveryNotes}
            setFormDetails={setFormDetails}
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
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CheckoutForm;
