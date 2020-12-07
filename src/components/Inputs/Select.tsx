// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  defaultText: string,
  options: Array<{
    value: string,
    text: string,
    disabled: boolean
  }>,
  name: string,
  value: string,
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
};

function Select(props: Props): ReactElement {
  const allOptionsDisabled = props.options.reduce((acc, item) => (
    acc && item.disabled
  ), true);

  return (
    <div className="form-group">
      <select
        className="form-control"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        <option value="">
          {allOptionsDisabled
            ? 'Item Currently Unavailable'
            : props.defaultText}
        </option>
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
