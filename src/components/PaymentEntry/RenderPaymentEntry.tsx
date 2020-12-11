// Requirements
import React, { ChangeEvent, FormEvent, ReactElement } from 'react';

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
}

function PaymentEntry(props: Props): ReactElement {
  const {
    paymentMethod,
    orderStatus,
    errors,
    handleChange,
    handleSubmit
  } = props;

  const message = orderStatus === 'CREATED'
    ? 'Please open Swish on your mobile phone to complete payment'
    : '';

  const buttonStatus = orderStatus === 'CALLING API' || orderStatus === 'CREATED'
    ? { disabled: true, text: 'Ordering...' }
    : { disabled: false, text: 'Order and Pay' };

  return (
    <fieldset id="submit-fieldset">
      <legend>Payment</legend>

      <div className="row">
        <div className="col-sm-6 offset-md-4" id="deliveryType">
          <form method="post" onSubmit={handleSubmit}>
            <Radio
              name="paymentMethod"
              id="swish"
              label="Swish"
              checked={paymentMethod === 'swish'}
              handleChange={handleChange}
            />
            <Radio
              name="paymentMethod"
              id="paymentLink"
              label="Payment Link (SMS after order)"
              checked={paymentMethod === 'paymentLink'}
              handleChange={handleChange}
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
      {errors.length > 0 && (
      <ul className={css.errors}>
        {errors.map((error) => (
          <li key={error.code}>{error.message}</li>
        ))}
      </ul>
      )}
    </fieldset>
  );
}

export default PaymentEntry;
