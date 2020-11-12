import React from 'react';
import PropTypes from 'prop-types';

function TextInput({
  id,
  label,
  placeholder,
  value,
  valid,
  handleChange,
  handleBlur
}) {
  const classes = ['form-control'];
  if (valid != null) {
    classes.push(valid ? 'is-valid' : 'is-invalid');
  }

  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-4 col-form-label">{label}</label>
      <div className="col-sm-6">
        <input
          type="text"
          className={classes.join(' ')}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
TextInput.defaultProps = {
  valid: null
};

export default TextInput;
