import React from 'react';
import PropTypes from 'prop-types';
import Radio from '../Inputs/Radio';

function PaymentEntry({ paymentMethod, handleChange, handleSubmit }) {
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
            <button className="btn btn-success" type="submit" id="submitorder" value="submit">Order and Pay</button>
          </form>
        </div>
      </div>
    </fieldset>
  );
}
PaymentEntry.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default PaymentEntry;
