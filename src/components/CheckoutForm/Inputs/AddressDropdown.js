import React from 'react';
import PropTypes from 'prop-types';

function AddressDropdown({
  id,
  label,
  placeholder,
  value,
  valid,
  zone,
  autoCompleteRef,
  handleChange,
  handleBlur
}) {
  const classes = ['form-control'];
  if (valid != null) {
    classes.push(valid ? 'is-valid' : 'is-invalid');
  }

  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-4 col-form-label">
        {label}
      </label>
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
          ref={autoCompleteRef}
        />
        <div>
          Zone&nbsp;
          {zone}
        </div>
      </div>
    </div>
  );
}
AddressDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  zone: PropTypes.number.isRequired,
  autoCompleteRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.func
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
AddressDropdown.defaultProps = {
  valid: null
};

export default AddressDropdown;
