import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Inputs/TextInput';

function DetailsEntry({
  name,
  validName,
  email,
  validEmail,
  telephone,
  validTelephone,
  handleChange,
  handleBlur
}) {
  return (
    <fieldset id="purchaser-details">
      <legend>Your details</legend>

      <TextInput
        id="name"
        label="Name"
        placeholder="Name"
        value={name}
        valid={validName}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <TextInput
        id="email"
        label="E-mail"
        placeholder="E-mail"
        value={email}
        valid={validEmail}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <TextInput
        id="telephone"
        label="Telephone Number"
        placeholder="Telephone Number"
        value={telephone}
        valid={validTelephone}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </fieldset>
  );
}
DetailsEntry.propTypes = {
  name: PropTypes.string.isRequired,
  validName: PropTypes.bool,
  email: PropTypes.string.isRequired,
  validEmail: PropTypes.bool,
  telephone: PropTypes.string.isRequired,
  validTelephone: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
DetailsEntry.defaultProps = {
  validName: null,
  validEmail: null,
  validTelephone: null
};

export default DetailsEntry;
