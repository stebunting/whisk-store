import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useHeaders from '../../hooks/useHeaders';
import { resetBasket } from '../../redux/actions/basketActions';

function OrderConfirmation({ resetBasketAction }) {
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

  useEffect(() => resetBasketAction());

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
OrderConfirmation.propTypes = {
  resetBasketAction: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    resetBasketAction: bindActionCreators(resetBasket, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(OrderConfirmation);
