// Requirements
import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Functions
import { updateUser } from '../../redux/actions/userActions';
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
  updateUserAction: (name: string, value: string) => void,
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
};

function PaymentEntry(props: Props) {
  // Set state on form input
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    props.updateUserAction(name, value);
  };

  return (
    <RenderPaymentEntry
      paymentMethod={props.paymentMethod}
      orderStatus={props.orderStatus}
      errors={props.errors}
      handleChange={handleChange}
      handleSubmit={props.handleSubmit}
    />
  );
}

function mapStateToProps({ user }: ReduxState) {
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