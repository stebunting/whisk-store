import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Inputs/TextInput';
import AddressDropdown from '../Inputs/AddressDropdown';

function DeliveryEntry({
  address,
  validAddress,
  deliveryNotes,
  updateAddress,
  handleChange,
  handleBlur,
}) {
  return (
    <div id="user-delivery">
      <AddressDropdown
        name="deliveryType"
        id="address"
        label="Address"
        placeholder="Address"
        value={address}
        valid={validAddress}
        updateAddress={updateAddress}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <TextInput
        name="deliveryType"
        id="deliveryNotes"
        label="Delivery Notes (please include doorcode and floor)"
        placeholder="Delivery Notes"
        value={deliveryNotes}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </div>
  );
}
DeliveryEntry.propTypes = {
  address: PropTypes.string.isRequired,
  validAddress: PropTypes.bool,
  deliveryNotes: PropTypes.string.isRequired,
  updateAddress: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
DeliveryEntry.defaultProps = {
  validAddress: null
};

export default DeliveryEntry;
