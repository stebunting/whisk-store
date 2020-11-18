import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { priceFormat } from '../../functions/helpers';
import * as basketActions from '../../redux/actions/basketActions';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import QuantityDropdown from './QuantityDropdown';
import { basketType } from '../../functions/types';

function Basket({ basket, actions }) {
  useEffect(() => {
    if (!basket.basketId) actions.loadBasket();
  }, [actions, basket]);

  function handleClick() {
    actions.resetBasket();
  }

  const basketContent = basket.items.length > 0
    ? (
      <>
        {basket.items.map((item) => (
          <tr key={item.productId}>
            <td>
              <Link to={`/product/${item.productId}`}>
                {item.name}
              </Link>
            </td>
            <td>
              <QuantityDropdown
                defaultValue={item.quantity}
                name={`update-${item.productId}`}
                handleChange={(event) => actions.updateBasket(item.productId, event.target.value)}
              />
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={() => actions.removeItemFromBasket(item.productId)}
              >
                Remove
              </button>
            </td>
            <td>{priceFormat(item.grossPrice)}</td>
            <td>{priceFormat(item.linePrice)}</td>
          </tr>
        ))}
        <tr>
          <th colSpan="3">DELIVERY</th>
          <td>
            {basket.statement && priceFormat(
              basket.statement.bottomLine.totalDelivery
            )}
          </td>
        </tr>
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
      </>
    )
    : (
      <tr key="noItems" colSpan="4">
        <td>
          NO ITEMS IN BASKET
        </td>
      </tr>
    );

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
          {basketContent}
        </tbody>
      </table>
      <div>
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={handleClick}
        >
          Reset Basket
        </button>
      </div>
      <CheckoutForm />
    </>
  );
}
Basket.propTypes = {
  basket: basketType.isRequired,
  actions: PropTypes.shape({
    loadBasket: PropTypes.func.isRequired,
    resetBasket: PropTypes.func.isRequired,
    updateBasket: PropTypes.func.isRequired,
    removeItemFromBasket: PropTypes.func.isRequired
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
      loadBasket: bindActionCreators(basketActions.loadBasket, dispatch),
      resetBasket: bindActionCreators(basketActions.resetBasket, dispatch),
      updateBasket: bindActionCreators(basketActions.updateBasket, dispatch),
      removeItemFromBasket: bindActionCreators(basketActions.removeItemFromBasket, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
