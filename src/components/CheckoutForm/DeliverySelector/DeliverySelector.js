import React from 'react';
import PropTypes from 'prop-types';
import DeliveryRadio from './DeliveryRadio';
import DeliveryZones from './DeliveryZones';

function DeliverySelector({ deliveryType, handleChange }) {
  return (
    <div className="row">
      <div className="col-sm-6 offset-md-4" id="deliveryType">
        <DeliveryRadio
          id="collection"
          label="Collection from Whisk"
          checked={deliveryType === 'collection'}
          handleChange={handleChange}
        />
        <DeliveryRadio
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
