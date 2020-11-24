import React from 'react';

function DeliveryZonesModal() {
  return (
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
  );
}

export default DeliveryZonesModal;
