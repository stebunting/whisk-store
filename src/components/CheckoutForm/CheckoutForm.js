import React from 'react';
import DeliverySelector from './DeliverySelector/DeliverySelector';
import DeliveryDate from './DeliverySelector/DeliveryDate';
import DeliveryEntry from './DeliverySelector/DeliveryEntry';
import DetailsEntry from './DetailsEntry/DetailsEntry';

function CheckoutForm() {
  const [formDetails, setFormDetails] = React.useState({
    deliveryType: 'collection',
    address: '',
    deliveryNotes: '',
    name: '',
    email: '',
    telephone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails({
      ...formDetails,
      [name]: value
    });
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
        {formDetails.deliveryType === 'delivery' && (
          <DeliveryEntry
            address={formDetails.address}
            deliveryNotes={formDetails.deliveryNotes}
            handleChange={handleChange}
          />
        )}
      </fieldset>
      <DetailsEntry
        name={formDetails.name}
        email={formDetails.email}
        telephone={formDetails.telephone}
        handleChange={handleChange}
      />
    </>
  );
}

export default CheckoutForm;
