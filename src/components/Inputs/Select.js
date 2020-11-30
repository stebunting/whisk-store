import React from 'react';
import PropTypes from 'prop-types';

function Select({
  defaultText,
  options,
  name,
  value,
  handleChange
}) {
  const allOptionsDisabled = options.reduce((acc, item) => acc && item.disabled, true);

  return (
    <div className="form-group">
      <select
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value="">{allOptionsDisabled ? 'Item Currently Unavailable' : defaultText}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
Select.propTypes = {
  defaultText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
  })).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Select;
