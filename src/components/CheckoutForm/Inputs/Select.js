import React from 'react';
import PropTypes from 'prop-types';

function Select({
  valid,
  defaultText,
  options,
  handleChange
}) {
  const classes = ['form-control'];
  if (valid != null) {
    classes.push(valid ? 'is-valid' : 'is-invalid');
  }

  return (
    <select
      className={classes.join(' ')}
      id="date"
      name="date"
      onChange={handleChange}
    >
      <option value="undefined">{defaultText}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.text}
        </option>
      ))}
    </select>
  );
}
Select.propTypes = {
  valid: PropTypes.bool,
  defaultText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
};
Select.defaultProps = {
  valid: null
};

export default Select;
