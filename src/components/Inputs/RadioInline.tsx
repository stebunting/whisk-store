// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  id: string,
  name: string,
  label: string,
  checked: boolean,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
};

function RadioInline(props: Props): ReactElement {
  return (
    <div className="form-check form-check-inline">
      <label
        className="form-check-label"
        htmlFor={name}
      >
        <input
          className="form-check-input"
          type="radio"
          id={props.id}
          name={props.id}
          value={props.name}
          checked={props.checked}
          onChange={props.handleChange}
        />
        {props.label}
      </label>
    </div>
  );
}

export default RadioInline;
