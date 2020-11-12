import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { basketType } from '../../../types';
import { rangeFormat } from '../../../helpers/index';

function DeliveryDate({ deliveryType, basket }) {
  const deliveryOptions = basket.items.length > 0
    ? basket.items[0][deliveryType]
    : [];
  return (
    <div className="form-group row">
      <div className="col-sm-10 offset-md-1 form-group">
        <select className="form-control form-control-sm" id="date" name="date">
          <option>{`Select a ${deliveryType} option...`}</option>
          {deliveryOptions.map((range) => (
            <option
              key={`${range.year}${range.week}${range.day}`}
              value={range.week}
            >
              {rangeFormat(range)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
DeliveryDate.propTypes = {
  deliveryType: PropTypes.string.isRequired,
  basket: basketType.isRequired
};

function mapStateToProps({ basket }) {
  return {
    basket
  };
}
export default connect(mapStateToProps)(DeliveryDate);
