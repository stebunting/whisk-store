// Requirements
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Radio from '../Inputs/Radio';

// Style
import css from './paymentEntry.module.less';

function PaymentEntry({
  paymentMethod,
  orderStatus,
  errors,
  handleChange,
  handleSubmit
}) {
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
PaymentEntry.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default PaymentEntry;
