// Requirements
import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

// Functions
import { updateUser, UpdateUserAction } from '../../redux/actions/userActions';
import { ReduxState } from '../../types/ReduxState';

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

function mapStateToProps({ user }: ReduxState) {
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
