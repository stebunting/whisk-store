// Requirements
import React, { ChangeEvent, FocusEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Custom Hooks
import useAutoComplete from '../../hooks/useAutoComplete';

// Redux Actions
import * as basketActions from '../../redux/actions/basketActions';
import * as userActions from '../../redux/actions/userActions';
import * as checkoutFormActions from '../../redux/actions/checkoutFormActions';

// Functions
import { getZone } from '../../functions/boundaries';
import { validate } from '../../functions/validate';

// Types
import { User } from '../../types/User';
import { Basket } from '../../types/Basket';
import { FormValidity } from '../../types/FormValidity';

// Components
import RenderAddressEntry from './RenderAddressEntry';
import { ReduxState } from '../../types/ReduxState';

interface Props {
  user: User,
  basket: Basket,
  validAddress: boolean | null,
  actions: {
    updateBasketZoneAction: (location: basketActions.BasketLocation) => void,
    updateUserAction: (name: string, value: string | boolean) => void,
    updateUserAddressAction: (formattedAddress: string, zone: number) => void,
    updateValidityAction: (name: string, value: boolean) => void,
    updateValidityAllAction: (validity: FormValidity) => void
  }
};

function AddressEntry(props: Props) {
  const { user, validAddress, basket, actions } = props;

  // Set up Google Autocomplete
  const [autoCompleteResult, autoCompleteRef] = useAutoComplete();
  useEffect(() => {
    const formattedAddress = autoCompleteResult.formatted_address || '';
    const latlon = Object.keys(autoCompleteResult).length > 0
      ? autoCompleteResult.geometry.location
      : null;
    const zone = getZone(latlon);
    actions.updateBasketZoneAction({ zone, address: formattedAddress });

    actions.updateUserAddressAction(formattedAddress, zone);
    actions.updateValidityAction(
      'address',
      validate({
        deliverable: basket.delivery.deliverable,
        address: formattedAddress,
        verifiedAddress: formattedAddress,
        zone
      }, 'address', validAddress)
    );
  }, [autoCompleteResult, actions, validAddress, basket.delivery.deliverable]);

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
    validAddress: state.validity.address
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateBasketZoneAction: bindActionCreators(basketActions.updateBasketZoneApi, dispatch),
      updateUserAction: bindActionCreators(userActions.updateUser, dispatch),
      updateUserAddressAction: bindActionCreators(userActions.updateUserAddress, dispatch),
      updateValidityAction: bindActionCreators(checkoutFormActions.updateValidity, dispatch),
      updateValidityAllAction: bindActionCreators(checkoutFormActions.updateValidityAll, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressEntry);
