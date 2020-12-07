// Requirements
import React, { ChangeEvent, FocusEvent, ReactElement, RefObject } from 'react';

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
  autoCompleteRef: RefObject<HTMLInputElement>,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void
};

function RenderAddressEntry(props: Props): ReactElement {
  return (
    <fieldset className="form-group" id="delivery-details">
      <legend>Delivery</legend>
      <DeliveryZonesModal />
      <div id="user-delivery">
        <AddressDropdown
          id="address"
          label="Address"
          placeholder="Address"
          value={props.address}
          valid={props.validAddress}
          deliverable={props.deliverable}
          autoCompleteRef={props.autoCompleteRef}
          handleChange={props.handleChange}
          handleBlur={props.handleBlur}
        />
        <TextInput
          id="deliveryNotes"
          label="Delivery Notes (please include doorcode and floor)"
          placeholder="Delivery Notes"
          value={props.deliveryNotes}
          valid={null}
          handleChange={props.handleChange}
          handleBlur={props.handleBlur}
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
