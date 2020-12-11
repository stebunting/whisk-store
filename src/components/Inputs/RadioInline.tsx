// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  id: string,
  name: string,
  label: string,
  checked: boolean,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function RadioInline(props: Props): ReactElement {
  const {
    id,
    name,
    label,
    checked,
    handleChange
  } = props;

  return (
    <div className="form-check form-check-inline">
      <label
        className="form-check-label"
        htmlFor={name}
      >
        <input
          className="form-check-input"
          type="radio"
          id={id}
          name={id}
          value={name}
          checked={checked}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
}

export default RadioInline;
