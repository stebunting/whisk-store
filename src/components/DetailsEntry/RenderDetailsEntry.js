import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Inputs/TextInput';

function RenderDetailsEntry({
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
        label="Full Name"
        placeholder="Full Name"
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
RenderDetailsEntry.propTypes = {
  name: PropTypes.string.isRequired,
  validName: PropTypes.bool,
  email: PropTypes.string.isRequired,
  validEmail: PropTypes.bool,
  telephone: PropTypes.string.isRequired,
  validTelephone: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
};
RenderDetailsEntry.defaultProps = {
  validName: null,
  validEmail: null,
  validTelephone: null
};

export default RenderDetailsEntry;
