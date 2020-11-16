import React from 'react';
import PropTypes from 'prop-types';
import Radio from '../Inputs/Radio';

function PaymentEntry({
  paymentMethod,
  orderStatus,
  handleChange,
  handleSubmit
}) {
  let message = '';
  console.log(orderStatus);
  switch (orderStatus) {
    case 'CALLING API':
      message = '...';
      break;

    case 'ORDERED':
      message = 'Please open Swish on your mobile phone to complete payment';
      break;

    default:
      break;
  }

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
              disabled={orderStatus !== ''}
              type="submit"
              id="submitorder"
              value="submit"
            >
              Order and Pay
            </button>
            <div>{message}</div>
          </form>
        </div>
      </div>
    </fieldset>
  );
}
PaymentEntry.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default PaymentEntry;
