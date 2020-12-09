// Requirements
import React, { ChangeEvent, FocusEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Custom Hooks
import useAutoComplete from '../../hooks/useAutoComplete';

// Redux Actions
import { updateBasketZoneApi, UpdateBasketZoneAction } from '../../redux/actions/basketActions';
import { updateUser, UpdateUserAction } from '../../redux/actions/userActions';
import { updateValidity, UpdateValidityType, updateValidityAll, UpdateValidityAllType } from '../../redux/actions/checkoutFormActions';

// Functions
import { getZone } from '../../functions/boundaries';
import { validate } from '../../functions/validate';

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
  actions: {
    updateBasketZoneAction: UpdateBasketZoneAction,
    updateUserAction: UpdateUserAction,
    updateValidityAction: UpdateValidityType,
    updateValidityAllAction: UpdateValidityAllType
  }
};

function AddressEntry(props: Props) {
  const { user, delivery, validAddress, basket, actions } = props;

  // Set up Google Autocomplete
  const autoCompleteRef = useAutoComplete();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      actions.updateUserAction('address', delivery.address);
      actions.updateBasketZoneAction(delivery);
    }
  }, [delivery])

  // This happens everytime the autocomplete finishes
  // useEffect(() => {

  //   // Update user state
  //   actions.updateValidityAction(
  //     'address',
  //     validate({
  //       deliverable: basket.delivery.deliverable,
  //       address: formattedAddress,
  //       verifiedAddress: formattedAddress,
  //       zone
  //     }, 'address', validAddress)
  //   );
  // }, [autoCompleteResult]);

  useEffect(() => {
    actions.updateUserAction('deliverable', basket.delivery && basket.delivery.deliverable);
    actions.updateUserAction('allCollections', basket.delivery && basket.delivery.allCollections);
  }, [actions, basket.delivery]);

  // Set state on form input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    actions.updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    actions.updateValidityAction(name, validate(user, name));
  };

  return (basket.delivery
    && basket.delivery.details
    && Object.keys(basket.delivery.details).length > 0
    && window.googleMapsLoaded
    && (
      <RenderAddressEntry
        address={user.address}
        validAddress={validAddress}
        deliverable={user.deliverable}
        deliveryNotes={user.deliveryNotes}
        autoCompleteRef={autoCompleteRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    )) || null;
}
AddressEntry.defaultProps = {
  validAddress: null
};

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
    actions: {
      updateBasketZoneAction: bindActionCreators(updateBasketZoneApi, dispatch),
      updateUserAction: bindActionCreators(updateUser, dispatch),
      updateValidityAction: bindActionCreators(updateValidity, dispatch),
      updateValidityAllAction: bindActionCreators(updateValidityAll, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressEntry);
