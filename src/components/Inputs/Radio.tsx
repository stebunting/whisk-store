// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  name: string,
  id: string,
  label: string,
  checked: boolean,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
};

function Radio(props: Props): ReactElement {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id={props.id}
        name={props.name}
        value={props.id}
        checked={props.checked}
        onChange={props.handleChange}
      />
      <label
        className="form-check-label"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
}

export default Radio;
