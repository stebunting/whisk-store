import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

function DeliveryEntry({ address, deliveryNotes, handleChange }) {
  return (
    <div id="user-delivery">
      <TextInput
        id="address"
        label="Address"
        placeholder="Address"
        value={address}
        handleChange={handleChange}
      />
      <TextInput
        id="deliveryNotes"
        label="Delivery Notes (please include doorcode and floor)"
        placeholder="Delivery Notes"
        value={deliveryNotes}
        handleChange={handleChange}
      />
    </div>
  );
}
DeliveryEntry.propTypes = {
  address: PropTypes.string.isRequired,
  deliveryNotes: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DeliveryEntry;
