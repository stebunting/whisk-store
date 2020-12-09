// Requirements
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Hooks
import useHeaders from '../../hooks/useHeaders';

// Redux Actions
import { resetBasket } from '../../redux/actions/basketActions';

interface Props {
  resetBasketAction: () => void
}

function OrderConfirmation(props: Props) {
  // Set Page Details
  const metadata = useHeaders({
    header: 'Order Confirmation',
    title: 'Whisk Store | Order Confirmation',
    description: 'Order Confirmation from Whisk Store'
  });

  const history = useHistory();
  const { location } = history;
  const paymentMethod = location.state != null
    ? location.state.paymentMethod
    : '';

  useEffect(() => props.resetBasketAction(), [props.resetBasketAction]);

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
  resetBasketAction: resetBasket
}

export default connect(null, mapDispatchToProps)(OrderConfirmation);
