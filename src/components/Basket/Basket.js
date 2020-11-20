import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import useHeaders from '../../hooks/useHeaders';
import * as basketActions from '../../redux/actions/basketActions';
import { basketType } from '../../functions/types';
import { priceFormat } from '../../functions/helpers';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import QuantityDropdown from './QuantityDropdown';
import Loading from '../Loading/Loading';
import css from './basket.module.less';

function Basket({ basket, actions }) {
  // Set Page Details
  const metadata = useHeaders({
    header: 'Basket',
    title: 'Whisk Store | Basket',
    description: 'Whisk Basket'
  });

  useEffect(() => !basket.basketId && actions.loadBasket(), [actions, basket]);

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

  return !basket.basketId ? <Loading>{metadata}</Loading> : (
    <>
      {metadata}
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
      updateBasket: bindActionCreators(basketActions.updateBasket, dispatch),
      removeItemFromBasket: bindActionCreators(basketActions.removeItemFromBasket, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
