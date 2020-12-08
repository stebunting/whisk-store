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
};
function RenderDetailsEntry(props: Props): ReactElement {
  return (
    <fieldset id="purchaser-details">
      <legend>Your details</legend>

      <TextInput
        id="name"
        label="Full Name"
        placeholder="Full Name"
        value={props.name}
        valid={props.validName}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
      />
      <TextInput
        id="email"
        label="E-mail"
        placeholder="E-mail"
        value={props.email}
        valid={props.validEmail}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
      />
      <TextInput
        id="telephone"
        label="Telephone Number"
        placeholder="Telephone Number"
        value={props.telephone}
        valid={props.validTelephone}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
      />
      <TextArea
        id="notes"
        label="Notes"
        placeholder="Notes"
        value={props.notes}
        handleChange={props.handleChange}
      />
    </fieldset>
  );
}

export default RenderDetailsEntry;
