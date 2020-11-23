import React from 'react';
import { Link } from 'react-router-dom';
import useHeaders from '../../hooks/useHeaders';
import { priceFormat, rangeFormat, capitaliseFirst } from '../../functions/helpers';
import { basketType } from '../../functions/types';
import QuantityDropdown from './QuantityDropdown';
import Loading from '../Loading/Loading';
import css from './basket.module.less';

function BasketSummary({ basket }) {
  // Set Page Details
  const metadata = useHeaders({
    header: 'Basket',
    title: 'Whisk Store | Basket',
    description: 'Whisk Basket'
  });

  const basketContent = basket.items.length > 0
    ? (
      <>
        {basket.items.map((item) => (
          <tr key={`${item.productId}-${item.deliveryDate}`}>
            <td className={css.tableCell}>
              <Link to={`/product/${item.productId}`}>
                {item.details.name}
              </Link>
              <div>
                {`${capitaliseFirst(item.deliveryType)} // ${rangeFormat(item.deliveryDate, { code: true })}`}
              </div>
            </td>
            <td className={css.tableCell}>
              {item.quantity}
              {/* <div className="form-row">
                <div className="col-xs">
                  <QuantityDropdown
                    strValue={`${item.quantity}`}
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
              </div> */}
            </td>
            <td className={css.tableCellAmount}>{priceFormat(item.details.grossPrice)}</td>
            <td className={css.tableCellAmount}>{priceFormat(item.linePrice)}</td>
          </tr>
        ))}
        {Object.keys(basket.delivery.details).map((key) => (
          <tr key={`DELIVERY-${key}`}>
            <td className={css.tableCell}>
              Delivery //&nbsp;
              {rangeFormat(key, { code: true, times: false })}
            </td>
            <td className={css.tableCell}>1</td>
            <td className={css.tableCellAmount}>
              {priceFormat(basket.delivery.details[key].total)}
            </td>
            <td className={css.tableCellAmount}>
              {priceFormat(basket.delivery.details[key].total)}
            </td>
          </tr>
        ))}
        <tr>
          <th className={css.bottomLine} colSpan="3">DELIVERY TOTAL</th>
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
    </>
  );
}
BasketSummary.propTypes = {
  basket: basketType.isRequired
};

export default BasketSummary;
