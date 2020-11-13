import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { basketType } from '../../../types';
import { rangeFormat } from '../../../helpers/index';
import Select from '../Inputs/Select';

function DeliveryDate({
  deliveryType,
  validDate,
  basket,
  handleChange
}) {
  const deliveryOptions = basket.items.length > 0
    ? basket.items[0][deliveryType]
    : [];

  return (
    <div className="form-group row">
      <div className="col-sm-10 offset-md-1 form-group">
        <Select
          valid={validDate}
          defaultText={`Select a ${deliveryType} option...`}
          options={deliveryOptions.map((range) => ({
            key: `${range.year}${range.week}${range.day}`,
            value: rangeFormat(range)
          }))}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
DeliveryDate.propTypes = {
  deliveryType: PropTypes.string.isRequired,
  validDate: PropTypes.bool,
  basket: basketType.isRequired,
  handleChange: PropTypes.func.isRequired
};
DeliveryDate.defaultProps = {
  validDate: null
};

function mapStateToProps({ basket }) {
  return {
    basket
  };
}
export default connect(mapStateToProps)(DeliveryDate);
