import React from 'react';
import PropTypes from 'prop-types';

function QuantityDropdown({ defaultValue, name, handleChange }) {
  const NUM_ITEMS = defaultValue > 20 ? defaultValue : 20;
  return (
    <select
      className="form-control"
      name={name}
      id={name}
      value={defaultValue}
      onChange={handleChange}
    >
      {new Array(NUM_ITEMS).fill().map((item, index) => (
        <option
          key={index + 1}
          value={index + 1}
        >
          {index + 1}
        </option>
      ))}
    </select>
  );
}
QuantityDropdown.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default QuantityDropdown;
