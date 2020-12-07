// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  strValue: string,
  name: string,
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
};

function QuantityDropdown(props: Props): ReactElement {
  const value = parseInt(props.strValue, 10);
  const NUM_ITEMS = value > 20 ? value : 20;

  return (
    <select
      className="form-control"
      name={props.name}
      id={props.name}
      value={value}
      onChange={props.handleChange}
    >
      {new Array(NUM_ITEMS).fill(null).map((_item, index) => (
        <option
          key={index + 1}
          value={index + 1}
        >
          {index + 1}
        </option>
      ))}
    </select>
  );
}

export default QuantityDropdown;
