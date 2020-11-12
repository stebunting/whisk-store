import React from 'react';
import PropTypes from 'prop-types';
import Radio from '../Inputs/Radio';
import DeliveryZones from './DeliveryZones';

function DeliverySelector({ deliveryType, handleChange }) {
  return (
    <div className="row">
      <div className="col-sm-6 offset-md-4" id="deliveryType">
        <Radio
          name="deliveryType"
          id="collection"
          label="Collection from Whisk"
          checked={deliveryType === 'collection'}
          handleChange={handleChange}
        />
        <Radio
          name="deliveryType"
          id="delivery"
          label="Delivery"
          checked={deliveryType === 'delivery'}
          handleChange={handleChange}
        />
        <DeliveryZones />
      </div>
    </div>
  );
}
DeliverySelector.propTypes = {
  deliveryType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DeliverySelector;
