import React, { useState } from 'react';
import DeliverySelector from './DeliverySelector/DeliverySelector';
import DeliveryDate from './DeliverySelector/DeliveryDate';
import DeliveryEntry from './DeliverySelector/DeliveryEntry';
import DetailsEntry from './DetailsEntry/DetailsEntry';
import PaymentEntry from './PaymentEntry/PaymentEntry';
import validate from '../../helpers/validate';

function CheckoutForm() {
  const [formDetails, setFormDetails] = useState({
    deliveryType: 'collection',
    paymentMethod: 'swish',
    address: '',
    verifiedAddress: null,
    deliveryNotes: '',
    name: '',
    email: '',
    telephone: ''
  });
  const [valid, setValid] = useState({
    name: null,
    email: null,
    telephone: null,
    address: null
  });

  const validateAddress = () => (
    formDetails.address === formDetails.verifiedAddress
  );

  const validateAll = () => {
    const allValidated = {};
    let allValid = true;
    Object.keys(valid).forEach((element) => {
      const validElement = element === 'address'
        ? validateAddress()
        : validate(formDetails[element], element);
      allValidated[element] = validElement;
      allValid = allValid && validElement;
    });
    setValid(allValidated);
    return allValid;
  };

  const updateAddress = (newAddress) => {
    setFormDetails({
      ...formDetails,
      address: newAddress,
      verifiedAddress: newAddress
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails({
      ...formDetails,
      [name]: value
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setValid(name === 'address'
      ? { ...valid, address: validateAddress() }
      : { ...valid, [name]: validate(value, name) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAll();
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
        />
        {formDetails.deliveryType === 'delivery' && window.googleApiLoaded && (
          <DeliveryEntry
            address={formDetails.address}
            validAddress={valid.address}
            deliveryNotes={formDetails.deliveryNotes}
            updateAddress={updateAddress}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
      </fieldset>
      <DetailsEntry
        name={formDetails.name}
        validName={valid.name}
        email={formDetails.email}
        validEmail={valid.email}
        telephone={formDetails.telephone}
        validTelephone={valid.telephone}
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
