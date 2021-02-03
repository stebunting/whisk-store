// Requirements
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

// Custom Hooks
import useAutoComplete from '../../hooks/useAutoComplete';

// Redux Actions
import { updateBasketZoneApi, UpdateBasketZoneAction } from '../../lib/redux/actions/basketActions';
import { updateUser, UpdateUserAction } from '../../lib/redux/actions/userActions';
import { updateValidity, UpdateValidityType } from '../../lib/redux/actions/checkoutFormActions';

// Functions
import { validate, validateAddress } from '../../lib/validate';

// Types
import { User } from '../../types/User';
import { Basket } from '../../types/Basket';
import { AppState } from '../../types/AppState';
import { Delivery } from '../../types/Delivery';

// Components
import RenderAddressEntry from './RenderAddressEntry';

interface Props {
  user: User,
  basket: Basket,
  delivery: Delivery,
  validAddress: boolean | null,
  updateBasketZoneAction: UpdateBasketZoneAction,
  updateUserAction: UpdateUserAction,
  updateValidityAction: UpdateValidityType
}

function AddressEntry(props: Props): React.ReactElement {
  const {
    user,
    basket,
    delivery,
    validAddress,
    updateBasketZoneAction,
    updateUserAction,
    updateValidityAction,
  } = props;

  // Set up Google Autocomplete
  const autoCompleteRef = useAutoComplete();

  // When autocomplete updates
  useEffect(() => {
    updateBasketZoneAction(delivery.address, delivery.zone);
  }, [delivery.address, delivery.zone, updateBasketZoneAction]);

  // When autocomplete updates
  useEffect(() => {
    updateValidityAction('address', validateAddress(user.address, delivery));
  }, [delivery, updateValidityAction]);

  // Set state on form input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === 'address') {
      updateValidityAction('address', validateAddress(user.address, delivery));
    } else {
      updateValidityAction(name, validate(value, name));
    }
  };

  return (basket.delivery
    && basket.delivery.details
    && Object.keys(basket.delivery.details).length > 0
    && window.googleMapsLoaded
    && (
      <RenderAddressEntry
        address={user.address}
        validAddress={validAddress}
        deliverable={basket.delivery.deliverable}
        deliveryNotes={user.deliveryNotes}
        autoCompleteRef={autoCompleteRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    )) || <></>;
}

function mapStateToProps(state: AppState) {
  return {
    user: state.user,
    basket: state.basket,
    delivery: state.delivery,
    validAddress: state.validity.address
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateBasketZoneAction: bindActionCreators(updateBasketZoneApi, dispatch),
    updateUserAction: bindActionCreators(updateUser, dispatch),
    updateValidityAction: bindActionCreators(updateValidity, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressEntry);
