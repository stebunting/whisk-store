// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  strValue: string,
  name: string,
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

function QuantityDropdown(props: Props): ReactElement {
  const { strValue, name, handleChange } = props;

  const value = parseInt(strValue, 10);
  const NUM_ITEMS = value > 20 ? value : 20;

  return (
    <select
      className="form-control"
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
    >
      {new Array(NUM_ITEMS).fill(null).map((_item, index) => (
        <option
          // eslint-disable-next-line react/no-array-index-key
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
