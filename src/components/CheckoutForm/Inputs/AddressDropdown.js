import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function AddressDropdown({
  id,
  label,
  placeholder,
  value,
  valid,
  updateAddress,
  handleChange,
  handleBlur
}) {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current, {
        types: ['address'],
        componentRestrictions: { country: ['se'] },
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(59.276402, 17.829733),
          new window.google.maps.LatLng(59.410845, 18.257856)
        )
      }
    );
    autocomplete.addListener('place_changed', () => {
      const googleLocation = autocomplete.getPlace();
      updateAddress(googleLocation.formatted_address);
      // const latlon = googleLocation.geometry.location;
    });
    autocompleteRef.current.addEventListener('keydown', (event) => {
      const pacContainers = Array.from(document.getElementsByClassName('pac-container'));
      const pacContainerVisible = pacContainers.reduce((visible, pacContainer) => (
        window.getComputedStyle(pacContainer).display !== 'none' || visible
      ), false);
      if ((event.which === 13 || event.which === 9) && pacContainerVisible) {
        event.preventDefault();
        return false;
      }
      return true;
    });
  }, [updateAddress]);

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
          ref={autocompleteRef}
        />
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
  updateAddress: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
AddressDropdown.defaultProps = {
  valid: null
};

export default AddressDropdown;
