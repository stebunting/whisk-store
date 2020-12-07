import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Inputs/TextInput';
import AddressDropdown from '../Inputs/AddressDropdown';
import DeliveryZonesModal from './DeliveryZonesModal';
import DeliveryZonesButton from './DeliveryZonesButton';

function RenderAddressEntry({
  address,
  validAddress,
  deliverable,
  deliveryNotes,
  autoCompleteRef,
  handleChange,
  handleBlur,
}) {
  return (
    <fieldset className="form-group" id="delivery-details">
      <legend>Delivery</legend>
      <DeliveryZonesModal />
      <div id="user-delivery">
        <AddressDropdown
          name="deliveryType"
          id="address"
          label="Address"
          placeholder="Address"
          value={address}
          valid={validAddress}
          deliverable={deliverable}
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
        <div className="row">
          <div className="offset-sm-4 col-sm-6">
            <DeliveryZonesButton />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
RenderAddressEntry.propTypes = {
  address: PropTypes.string.isRequired,
  validAddress: PropTypes.bool,
  deliverable: PropTypes.bool.isRequired,
  deliveryNotes: PropTypes.string.isRequired,
  autoCompleteRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.func
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
RenderAddressEntry.defaultProps = {
  validAddress: null
};

export default RenderAddressEntry;
