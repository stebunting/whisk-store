// Requirements
import React from 'react';
import PropTypes from 'prop-types';

function RadioInline({
  id,
  name,
  label,
  checked,
  handleChange
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
          id={id}
          name={id}
          value={name}
          checked={checked}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
}
RadioInline.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default RadioInline;
