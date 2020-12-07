// Requirements
import React, { ChangeEvent, FormEvent } from 'react';

// Components
import Radio from '../Inputs/Radio';

// Style
import css from './paymentEntry.module.less';

interface Props {
  paymentMethod: string,
  orderStatus: string,
  errors: Array<{
    code: string,
    message: string
  }>,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
};

function PaymentEntry(props: Props) {
  const message = props.orderStatus === 'CREATED'
    ? 'Please open Swish on your mobile phone to complete payment'
    : '';

  const buttonStatus = props.orderStatus === 'CALLING API' || props.orderStatus === 'CREATED'
    ? { disabled: true, text: 'Ordering...' }
    : { disabled: false, text: 'Order and Pay' };

  return (
    <fieldset id="submit-fieldset">
      <legend>Payment</legend>

      <div className="row">
        <div className="col-sm-6 offset-md-4" id="deliveryType">
          <form method="post" onSubmit={props.handleSubmit}>
            <Radio
              name="paymentMethod"
              id="swish"
              label="Swish"
              checked={props.paymentMethod === 'swish'}
              handleChange={props.handleChange}
            />
            <Radio
              name="paymentMethod"
              id="paymentLink"
              label="Payment Link (SMS after order)"
              checked={props.paymentMethod === 'paymentLink'}
              handleChange={props.handleChange}
            />
            <button
              className="btn btn-success"
              disabled={buttonStatus.disabled}
              type="submit"
              id="submitorder"
              value="submit"
            >
              {buttonStatus.text}
            </button>
          </form>
        </div>
      </div>
      {message && <div className={css.message}>{message}</div>}
      {props.errors.length > 0 && (
      <ul className={css.errors}>
        {props.errors.map((error) => (
          <li key={error.code}>{error.message}</li>
        ))}
      </ul>
      )}
    </fieldset>
  );
}

export default PaymentEntry;
