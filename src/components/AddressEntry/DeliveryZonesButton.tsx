// Requirements
import React, { ReactElement } from 'react';

function DeliveryZonesButton(): ReactElement {
  return (
    <button
      type="button"
      className="btn icon-button btn-sm"
      data-toggle="modal"
      data-target="#deliveryZoneModal"
    >
      <img
        className="delivery-icon"
        src="/icons/zone-map.png"
        alt="Delivery Zones"
      />
      Delivery Zones
    </button>
  );
}

export default DeliveryZonesButton;
