// Requirements
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Custom Hooks
import useAutoComplete from '../../hooks/useAutoComplete';

// Redux Actions
import { updateBasketZoneApi, UpdateBasketZoneAction } from '../../redux/actions/basketActions';
import { updateUser, UpdateUserAction } from '../../redux/actions/userActions';
import { updateValidity, UpdateValidityType, updateValidityAll, UpdateValidityAllType } from '../../redux/actions/checkoutFormActions';

// Functions
import { validate, validateAddress } from '../../functions/validate';

// Types
import { User } from '../../types/User';
import { Basket } from '../../types/Basket';

// Components
import RenderAddressEntry from './RenderAddressEntry';
import { ReduxState } from '../../types/ReduxState';
import { Delivery } from '../../types/Delivery';

interface Props {
  user: User,
  basket: Basket,
  delivery: Delivery,
  validAddress: boolean | null,
  updateBasketZoneAction: UpdateBasketZoneAction,
  updateUserAction: UpdateUserAction,
  updateValidityAction: UpdateValidityType,
  updateValidityAllAction: UpdateValidityAllType
};

function AddressEntry(props: Props): React.ReactElement {
  const {
    user,
    basket,
    delivery,
    validAddress,
    updateBasketZoneAction,
    updateUserAction,
    updateValidityAction,
    updateValidityAllAction
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

  useEffect(() => {
    updateUserAction('allCollections', basket.delivery && basket.delivery.allCollections);
  }, [updateUserAction, basket.delivery]);

  // Set state on form input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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

function mapStateToProps(state: ReduxState) {
  return {
    basket: state.basket,
    user: state.user,
    delivery: state.delivery,
    validAddress: state.validity.address
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateBasketZoneAction: bindActionCreators(updateBasketZoneApi, dispatch),
    updateUserAction: bindActionCreators(updateUser, dispatch),
    updateValidityAction: bindActionCreators(updateValidity, dispatch),
    updateValidityAllAction: bindActionCreators(updateValidityAll, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressEntry);
