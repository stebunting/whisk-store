// Requirements
import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Redux Actions
import { resetBasketApi } from '../../lib/redux/actions/basketActions';

interface OrderState {
  paymentMethod: 'swish' | 'paymentLink'
}

interface Props {
  resetBasketAction: () => void
}

function OrderConfirmation(props: Props): ReactElement {
  const { resetBasketAction } = props;

  // Set Page Details
  const metadata = useHeaders({
    header: 'Order Confirmation',
    title: 'Whisk Store | Order Confirmation',
    description: 'Order Confirmation from Whisk Store'
  });

  const history = useHistory<OrderState>();
  const { location } = history;
  const paymentMethod = location.state != null
    ? location.state.paymentMethod
    : '';

  useEffect(() => resetBasketAction(), [resetBasketAction]);

  let message;
  switch (paymentMethod) {
    case 'paymentLink':
      message = 'Order Confirmed! Please look out for your payment link coming soon!';
      break;

    case 'swish':
      message = 'Order Confirmed! Thank you for your order.';
      break;

    default:
      history.push('/');
      break;
  }

  return (
    <>
      {metadata}
      <div>{message}</div>
    </>
  );
}

const mapDispatchToProps = {
  resetBasketAction: resetBasketApi
};

export default connect(null, mapDispatchToProps)(OrderConfirmation);
