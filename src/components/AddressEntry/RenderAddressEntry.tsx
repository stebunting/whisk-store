// Requirements
import React from 'react';

// Components
import TextInput from '../Inputs/TextInput';
import AddressDropdown from '../Inputs/AddressDropdown';
import DeliveryZonesModal from './DeliveryZonesModal';
import DeliveryZonesButton from './DeliveryZonesButton';

interface Props {
  address: string,
  validAddress: boolean | null,
  deliverable: boolean,
  deliveryNotes: string,
  autoCompleteRef: React.RefObject<HTMLInputElement>,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

function RenderAddressEntry(props: Props): React.ReactElement {
  const {
    address,
    validAddress,
    deliverable,
    deliveryNotes,
    autoCompleteRef,
    handleChange,
    handleBlur,
  } = props;
  return (
    <fieldset className="form-group" id="delivery-details">
      <legend>Delivery</legend>
      <DeliveryZonesModal />
      <div id="user-delivery">
        <AddressDropdown
          id="address"
          label="Address"
          placeholder="Address"
          value={address}
          valid={validAddress}
          deliverable={deliverable}
          autoCompleteRef={autoCompleteRef}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          id="deliveryNotes"
          label="Delivery Notes (please include doorcode and floor)"
          placeholder="Delivery Notes"
          value={deliveryNotes}
          valid={null}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <div className="row">
          <div className="offset-sm-4 col-sm-6">
            <DeliveryZonesButton />
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default RenderAddressEntry;
