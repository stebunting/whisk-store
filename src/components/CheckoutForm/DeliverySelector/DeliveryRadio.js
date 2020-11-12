import React from 'react';
import PropTypes from 'prop-types';

function DeliveryRadio({
  id,
  label,
  checked,
  handleChange
}) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id={id}
        name="deliveryType"
        value={id}
        checked={checked}
        onChange={handleChange}
      />
      <label
        className="form-check-label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
DeliveryRadio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DeliveryRadio;
