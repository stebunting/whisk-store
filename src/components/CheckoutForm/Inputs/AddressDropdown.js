import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function AddressDropdown({
  id,
  label,
  placeholder,
  value,
  valid,
  delivery,
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
        <div>{delivery.deliverable || delivery.zone < 0 || 'NO DELIVERY TO THIS LOCATION'}</div>
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
  delivery: PropTypes.shape({
    zone: PropTypes.number.isRequired,
    price: PropTypes.number,
    momsRate: PropTypes.number,
    deliverable: PropTypes.bool
  }).isRequired,
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

function mapStateToProps({ basket }) {
  return {
    delivery: basket.delivery
  };
}

export default connect(mapStateToProps)(AddressDropdown);
