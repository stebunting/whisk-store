// Requirements
import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

// Functions
import { updateUser, UpdateUserAction } from '../../lib/redux/actions/userActions';
import { AppState } from '../../types/AppState';

// Components
import RenderPaymentEntry from './RenderPaymentEntry';

interface Props {
  paymentMethod: string,
  orderStatus: string,
  errors: Array<{
    code: string,
    message: string
  }>,
  updateUserAction: UpdateUserAction,
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function PaymentEntry(props: Props) {
  const {
    paymentMethod,
    orderStatus,
    errors,
    updateUserAction,
    handleSubmit
  } = props;

  // Set state on form input
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
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

function mapStateToProps({ user }: AppState) {
  return {
    paymentMethod: user.paymentMethod
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateUserAction: bindActionCreators(updateUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentEntry);
