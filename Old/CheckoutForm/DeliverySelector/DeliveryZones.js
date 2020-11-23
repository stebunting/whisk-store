import React from 'react';

function DeliveryZones() {
  return (
    <>
      <div className="modal fade" id="deliveryZoneModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <a href="/images/delivery-zones.jpg" target="_blank">
                <img className="delivery-img" src="/images/delivery-zones.jpg" alt="Delivery Zones" />
              </a>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default DeliveryZones;
