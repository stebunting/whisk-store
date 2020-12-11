// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  name: string,
  id: string,
  label: string,
  checked: boolean,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Radio(props: Props): ReactElement {
  const {
    name,
    id,
    label,
    checked,
    handleChange
  } = props;

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id={id}
        name={name}
        value={id}
        checked={checked}
        onChange={handleChange}
      />
      <label
        className="form-check-label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default Radio;
