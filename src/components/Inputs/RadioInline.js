import React from 'react';
import PropTypes from 'prop-types';

function RadioInline({
  name,
  value,
  label,
  checked,
  handleClick
}) {
  return (
    <div className="form-check form-check-inline">
      <label
        className="form-check-label"
        htmlFor={name}
      >
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id={name}
          value={value}
          checked={checked}
          onChange={handleClick}
        />
        {label}
      </label>
    </div>
  );
}
RadioInline.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default RadioInline;
