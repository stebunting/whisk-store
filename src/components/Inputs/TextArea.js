import React from 'react';
import PropTypes from 'prop-types';

function TextArea({
  id,
  label,
  placeholder,
  value,
  handleChange
}) {
  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-4 col-form-label">{label}</label>
      <div className="col-sm-6">
        <textarea
          className="form-control"
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default TextArea;
