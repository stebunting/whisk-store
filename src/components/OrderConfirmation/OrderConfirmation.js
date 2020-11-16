import React from 'react';
import { useHistory } from 'react-router-dom';

function OrderConfirmation() {
  const history = useHistory();
  const { location } = history;
  const paymentMethod = location.state != null
    ? location.state.paymentMethod
    : '';

  let message;
  switch (paymentMethod) {
    case 'paymentLink':
      message = 'Order Confirmed! Please look out for your payment link coming soon!'
      break;

    default:
      history.push('/');
      break;
  }

  return (
    <div>{message}</div>
  );
}

export default OrderConfirmation;
