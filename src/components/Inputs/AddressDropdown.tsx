// Requirements
import React, { ChangeEvent, FocusEvent, ReactElement, RefObject } from 'react';

interface Props {
  id: string,
  label: string,
  placeholder: string,
  value: string,
  valid: boolean | null,
  deliverable: boolean,
  autoCompleteRef: RefObject<HTMLInputElement>
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
};

function AddressDropdown(props: Props): ReactElement {
  const classes = ['form-control'];
  if (props.valid != null) {
    classes.push(props.valid ? 'is-valid' : 'is-invalid');
  }

  return (
    <div className="form-group row">
      <label
        htmlFor={props.id}
        className="col-sm-4 col-form-label"
      >
        {props.label}
      </label>
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
          ref={props.autoCompleteRef}
        />
        {!props.deliverable && `* We cannot deliver to this Location *`}
      </div>
    </div>
  );
}

export default AddressDropdown;
