import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../redux/actions/userActions';
import RenderPaymentEntry from './RenderPaymentEntry';

function PaymentEntry({
  paymentMethod,
  orderStatus,
  errors,
  updateUserAction,
  handleSubmit,
}) {
  // Set state on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateUserAction(name, value);
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
  orderStatus: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })).isRequired,
  updateUserAction: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
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
