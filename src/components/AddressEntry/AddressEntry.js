import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useAutoComplete from '../../hooks/useAutoComplete';
import { getZone } from '../../functions/boundaries';
import { validate } from '../../functions/validate';
import RenderAddressEntry from './RenderAddressEntry';
import * as basketActions from '../../redux/actions/basketActions';
import * as userActions from '../../redux/actions/userActions';
import * as checkoutFormActions from '../../redux/actions/checkoutFormActions';
import { userType, basketType } from '../../functions/types';

function AddressEntry({
  user,
  validAddress,
  basket,
  actions
}) {
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

  // Set state on form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    actions.updateUserAction(name, value);
  };

  // Validate input field when moving away
  const handleBlur = (event) => {
    const { name } = event.target;
    actions.updateValidityAction(name, validate(user, name));
  };

  // const fetchSwishStatus = async (swishId, timerId) => {
  //   const swish = await checkSwishStatus(swishId);
  //   setOrderStatus(swish.status);
  //   switch (swish.status) {
  //     case 'ERROR':
  //     case 'CANCELLED':
  //       clearInterval(timerId);
  //       setErrors((prevState) => ([
  //         ...prevState, {
  //           code: swish.errorCode,
  //           message: swish.errorMessage
  //         }
  //       ]));
  //       break;

  //     case 'DECLINED':
  //       clearInterval(timerId);
  //       setErrors((prevState) => ([
  //         ...prevState, {
  //           code: 'BE18',
  //           message: 'Transaction Declined by Purchaser'
  //         }
  //       ]));
  //       break;

  //     case 'PAID':
  //       clearInterval(timerId);
  //       return history.push('/orderconfirmation', { ...swish });

  //     default:
  //       break;
  //   }
  //   return false;
  // };

  // // Submit payment form
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrors([]);
  //   const [allValid, validated] = validateAll(user, validity);
  //   actions.updateValidityAllAction(validated);

  //   if (allValid) {
  //     // Send Order to Server
  //     setOrderStatus('CALLING API');
  //     const data = await sendOrder(user);
  //     setOrderStatus(data.status);
  //     if (data.status === 'PAID') {
  //       return history.push('/orderconfirmation', { ...data });
  //     }

  //     // If Swish Payment Created
  //     const SWISH_UPDATE_INTERVAL = 2000;
  //     if (data.status === 'CREATED') {
  //       const { id: swishId } = data;
  //       setTimeout(() => (
  //         fetchSwishStatus(swishId)
  //       ), SWISH_UPDATE_INTERVAL);
  //     } else {
  //       setErrors((prevState) => ([
  //         ...prevState, {
  //           code: data.errorCode,
  //           message: data.errorMessage
  //         }
  //       ]));
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  return Object.keys(basket.delivery.details).length > 0 && window.googleMapsLoaded && (
    <fieldset className="form-group" id="delivery-details">
      <legend>Delivery</legend>
      <RenderAddressEntry
        address={user.address}
        validAddress={validAddress}
        zone={user.zone}
        deliveryNotes={user.deliveryNotes}
        autoCompleteRef={autoCompleteRef}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </fieldset>
  );
}
AddressEntry.propTypes = {
  user: userType.isRequired,
  basket: basketType.isRequired,
  validAddress: PropTypes.bool,
  actions: PropTypes.shape({
    updateBasketZoneAction: PropTypes.func.isRequired,
    updateUserAction: PropTypes.func.isRequired,
    updateUserAddressAction: PropTypes.func.isRequired,
    updateValidityAction: PropTypes.func.isRequired,
    updateValidityAllAction: PropTypes.func.isRequired
  }).isRequired
};
AddressEntry.defaultProps = {
  validAddress: null
};

function mapStateToProps({ basket, user, validity }) {
  return {
    basket,
    user,
    validAddress: validity.address
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
