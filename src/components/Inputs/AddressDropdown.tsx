// Requirements
import React, { ChangeEvent, FocusEvent, ReactElement } from 'react';

interface Props {
  id: string,
  label: string,
  placeholder: string,
  value: string,
  valid: boolean | null,
  deliverable: boolean,
  autoCompleteRef: React.RefObject<HTMLInputElement>
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
}

function AddressDropdown(props: Props): ReactElement {
  const {
    id,
    label,
    placeholder,
    value,
    valid,
    deliverable,
    autoCompleteRef,
    handleChange,
    handleBlur
  } = props;

  const classes = ['form-control'];
  if (valid != null) {
    classes.push(valid ? 'is-valid' : 'is-invalid');
  }

  return (
    <div className="form-group row">
      <label
        htmlFor={id}
        className="col-sm-4 col-form-label"
      >
        {label}
      </label>
      <div className="col-sm-6">
        <input
          type="text"
          className={classes.join(' ')}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={autoCompleteRef}
        />
        {!deliverable && '* We cannot deliver to this Location *'}
      </div>
    </div>
  );
}

export default AddressDropdown;
