import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Inputs/TextInput';
import AddressDropdown from '../Inputs/AddressDropdown';

function DeliveryEntry({
  address,
  validAddress,
  zone,
  deliveryNotes,
  autoCompleteRef,
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
        zone={zone}
        autoCompleteRef={autoCompleteRef}
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
  zone: PropTypes.number.isRequired,
  deliveryNotes: PropTypes.string.isRequired,
  autoCompleteRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.func
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
DeliveryEntry.defaultProps = {
  validAddress: null
};

export default DeliveryEntry;
