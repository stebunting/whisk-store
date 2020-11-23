import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userType, validityType } from '../../functions/types';
import { validate } from '../../functions/validate';
import { updateUser } from '../../redux/actions/userActions';
import { updateValidity } from '../../redux/actions/checkoutFormActions';
import RenderDetailsEntry from './RenderDetailsEntry';

function DetailsEntry({
  user,
  validity,
  updateUserAction,
  updateValidityAction
}) {
  // Set state on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event) => {
    const { name } = event.target;
    console.log('here');
    updateValidityAction(name, validate(user, name));
  };

  return (
    <RenderDetailsEntry
      name={user.name}
      validName={validity.name}
      email={user.email}
      validEmail={validity.email}
      telephone={user.telephone}
      validTelephone={validity.telephone}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
  );
}
DetailsEntry.propTypes = {
  user: userType.isRequired,
  validity: validityType.isRequired,
  updateUserAction: PropTypes.func.isRequired,
  updateValidityAction: PropTypes.func.isRequired
};

function mapStateToProps({ user, validity }) {
  return {
    user,
    validity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserAction: bindActionCreators(updateUser, dispatch),
    updateValidityAction: bindActionCreators(updateValidity, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsEntry);
