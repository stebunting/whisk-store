// Requirements
import React, { FocusEvent, ChangeEvent, ReactElement } from 'react';

interface Props {
  id: string,
  label: string,
  placeholder: string,
  value: string,
  valid: boolean | null,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
}

function TextInput(props: Props): ReactElement {
  const classes = ['form-control'];
  if (props.valid != null) {
    classes.push(props.valid ? 'is-valid' : 'is-invalid');
  }

  return (
    <div className="form-group row">
      <label htmlFor={props.id} className="col-sm-4 col-form-label">{props.label}</label>
      <div className="col-sm-6">
        <input
          type="text"
          className={classes.join(' ')}
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </div>
    </div>
  );
}

export default TextInput;
