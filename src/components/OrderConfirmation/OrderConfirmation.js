import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import useTitle from '../../hooks/useTitle';
import { resetBasket } from '../../redux/actions/basketActions';

function OrderConfirmation({ actions }) {
  useTitle('ORDER CONFIRMATION');
  const history = useHistory();
  const { location } = history;
  const paymentMethod = location.state != null
    ? location.state.paymentMethod
    : '';

  useEffect(() => actions.resetBasket());

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
    <div>{message}</div>
  );
}
OrderConfirmation.propTypes = {
  actions: PropTypes.shape({
    resetBasket: PropTypes.func.isRequired
  }).isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      resetBasket: bindActionCreators(resetBasket, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(OrderConfirmation);
