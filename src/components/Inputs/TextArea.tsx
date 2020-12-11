// Requirements
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  id: string,
  label: string,
  placeholder: string,
  value: string,
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

function TextArea(props: Props): ReactElement {
  const {
    id,
    label,
    placeholder,
    value,
    handleChange
  } = props;

  return (
    <div className="form-group row">
      <label
        htmlFor={id}
        className="col-sm-4 col-form-label"
      >
        {label}
      </label>
      <div className="col-sm-6">
        <textarea
          className="form-control"
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default TextArea;
