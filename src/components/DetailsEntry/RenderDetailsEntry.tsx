// Requirements
import React, { ChangeEvent, FocusEvent, ReactElement } from 'react';

// Components
import TextInput from '../Inputs/TextInput';
import TextArea from '../Inputs/TextArea';

interface Props {
  name: string,
  validName: boolean | null,
  email: string,
  validEmail: boolean | null,
  telephone: string,
  validTelephone: boolean | null,
  notes: string,
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
}

function RenderDetailsEntry(props: Props): ReactElement {
  const {
    name,
    validName,
    email,
    validEmail,
    telephone,
    validTelephone,
    notes,
    handleChange,
    handleBlur
  } = props;
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
      <TextArea
        id="notes"
        label="Notes"
        placeholder="Notes"
        value={notes}
        handleChange={handleChange}
      />
    </fieldset>
  );
}

export default RenderDetailsEntry;
