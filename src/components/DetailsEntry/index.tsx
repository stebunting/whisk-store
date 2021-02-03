// Requirements
import React, { ChangeEvent, FocusEvent, ReactElement } from 'react';
import { connect } from 'react-redux';

// Redux Actions
import { updateUser } from '../../lib/redux/actions/userActions';
import { updateValidity } from '../../lib/redux/actions/checkoutFormActions';

// Functions
import { validate } from '../../lib/validate';

// Types
import { User } from '../../types/User';
import { FormValidity } from '../../types/FormValidity';
import { AppState } from '../../types/AppState';

// Components
import RenderDetailsEntry from './RenderDetailsEntry';

interface Props {
  user: User,
  validity: FormValidity,
  updateUserAction: (name: string, value: string | boolean) => void,
  updateValidityAction: (name: string, value: boolean) => void,
}

function DetailsEntry(props: Props): ReactElement {
  const {
    user,
    validity,
    updateUserAction,
    updateValidityAction
  } = props;

  // Set state on form input
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.currentTarget;
    updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    updateValidityAction(name, validate(value, name));
  };

  return (
    <RenderDetailsEntry
      name={user.name}
      validName={validity.name}
      email={user.email}
      validEmail={validity.email}
      telephone={user.telephone}
      notes={user.notes}
      validTelephone={validity.telephone}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
  );
}

function mapStateToProps(state: AppState) {
  return {
    user: state.user,
    validity: state.validity
  };
}

const mapDispatchToProps = {
  updateUserAction: updateUser,
  updateValidityAction: updateValidity
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsEntry);
