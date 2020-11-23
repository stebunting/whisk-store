import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../redux/actions/userActions';
import RenderPaymentEntry from './RenderPaymentEntry';

function PaymentEntry({
  paymentMethod,
  updateUserAction,
}) {
  const [orderStatus, setOrderStatus] = useState('');
  const [errors, setErrors] = useState([]);

  // Set state on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateUserAction(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <RenderPaymentEntry
      paymentMethod={paymentMethod}
      orderStatus={orderStatus}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
PaymentEntry.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  updateUserAction: PropTypes.func.isRequired,
};

function mapStateToProps({ user }) {
  return {
    paymentMethod: user.paymentMethod
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserAction: bindActionCreators(updateUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentEntry);
