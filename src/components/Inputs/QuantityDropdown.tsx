// Requirements
import React from 'react';
import PropTypes from 'prop-types';

function QuantityDropdown({ strValue, name, handleChange }) {
  const value = parseInt(strValue, 10);
  const NUM_ITEMS = value > 20 ? value : 20;
  return (
    <select
      className="form-control"
      name={name}
      id={name}
      value={value}
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
  strValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default QuantityDropdown;
