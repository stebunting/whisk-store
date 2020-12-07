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
  return (
    <div className="form-group row">
      <label
        htmlFor={props.id}
        className="col-sm-4 col-form-label"
      >
        {props.label}
      </label>
      <div className="col-sm-6">
        <textarea
          className="form-control"
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}

export default TextArea;
