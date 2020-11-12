import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { priceFormat } from '../../helpers';
import * as basketActions from '../../redux/actions/basketActions';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { basketType } from '../../types';

function Basket({ basket, actions }) {
  useEffect(() => {
    if (!basket.basketId) actions.loadBasket();
  }, [actions, basket]);

  return (
    <>
      <ul>
        <li><h2>Basket</h2></li>
        <li>{basket.basketId}</li>
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>SUB-TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {basket.items && basket.items.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{priceFormat(item.grossPrice)}</td>
              <td>{priceFormat(item.linePrice)}</td>
            </tr>
          ))}
          <tr>
            <th colSpan="3">MOMS TOTAL</th>
            <td>
              {basket.statement && priceFormat(
                basket.statement.bottomLine.totalMoms,
                { includeOre: true }
              )}
            </td>
          </tr>
          <tr>
            <th colSpan="3">TOTAL</th>
            <td>
              {basket.statement && priceFormat(
                basket.statement.bottomLine.totalPrice
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <CheckoutForm />
    </>
  );
}
Basket.propTypes = {
  basket: basketType.isRequired,
  actions: PropTypes.shape({
    loadBasket: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ basket }) {
  return {
    basket
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadBasket: bindActionCreators(basketActions.loadBasket, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
