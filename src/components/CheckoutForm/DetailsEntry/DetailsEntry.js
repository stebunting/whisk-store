import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

function DetailsEntry({
  name,
  email,
  telephone,
  handleChange
}) {
  return (
    <fieldset id="purchaser-details">
      <legend>Your details</legend>

      <TextInput
        id="name"
        label="Name"
        placeholder="Name"
        value={name}
        handleChange={handleChange}
      />
      <TextInput
        id="email"
        label="E-mail"
        placeholder="E-mail"
        value={email}
        handleChange={handleChange}
      />
      <TextInput
        id="telephone"
        label="Telephone Number"
        placeholder="Telephone Number"
        value={telephone}
        handleChange={handleChange}
      />
    </fieldset>
  );
}
DetailsEntry.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DetailsEntry;
