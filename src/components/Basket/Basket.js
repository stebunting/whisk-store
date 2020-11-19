import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import useTitle from '../../hooks/useTitle';
import { priceFormat } from '../../functions/helpers';
import * as basketActions from '../../redux/actions/basketActions';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import QuantityDropdown from './QuantityDropdown';
import { basketType } from '../../functions/types';
import css from './basket.module.less';

function Basket({ basket, actions }) {
  useTitle('Basket');
  useEffect(() => {
    if (!basket.basketId) actions.loadBasket();
  }, [actions, basket]);

  const basketContent = basket.items.length > 0
    ? (
      <>
        {basket.items.map((item) => (
          <tr key={item.productId}>
            <td className={css.tableCell}>
              <Link to={`/product/${item.productId}`}>
                {item.name}
              </Link>
            </td>
            <td className={css.tableCell}>
              <div className="form-row">
                <div className="col-xs">
                  <QuantityDropdown
                    defaultValue={item.quantity}
                    name={`update-${item.productId}`}
                    handleChange={(event) => actions
                      .updateBasket(item.productId, event.target.value)}
                  />
                </div>
                <div className="col-sm-auto">
                  <button
                    className="btn btn-link form-control"
                    type="button"
                    onClick={() => actions.removeItemFromBasket(item.productId)}
                  >
                    <img src="/icons/delete.svg" alt="Remove item from basket" />
                  </button>
                </div>
              </div>
            </td>
            <td className={css.tableCellAmount}>{priceFormat(item.grossPrice)}</td>
            <td className={css.tableCellAmount}>{priceFormat(item.linePrice)}</td>
          </tr>
        ))}
        <tr>
          <th className={css.bottomLine} colSpan="3">DELIVERY</th>
          <td className={css.bottomLine}>
            {basket.statement && priceFormat(
              basket.statement.bottomLine.totalDelivery
            )}
          </td>
        </tr>
        <tr>
          <th className={css.bottomLine} colSpan="3">MOMS TOTAL</th>
          <td className={css.bottomLine}>
            {basket.statement && priceFormat(
              basket.statement.bottomLine.totalMoms,
              { includeOre: true }
            )}
          </td>
        </tr>
        <tr>
          <th className={css.bottomLine} colSpan="3">TOTAL</th>
          <td className={css.bottomLine}>
            {basket.statement && priceFormat(
              basket.statement.bottomLine.totalPrice
            )}
          </td>
        </tr>
      </>
    )
    : (
      <tr key="noItems" colSpan="4">
        <td className={css.emptyBasketText} colSpan="4">
          NO ITEMS IN BASKET
        </td>
      </tr>
    );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">QUANTITY</th>
            <th className={css.tableCellAmount} scope="col">PRICE</th>
            <th className={css.tableCellAmount} scope="col">SUB-TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {basketContent}
        </tbody>
      </table>
      {basket.items.length > 0 && <CheckoutForm />}
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
