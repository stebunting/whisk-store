// Requirements
import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { priceFormat, capitalise } from '@stebunting/library';

// Functions
import { rangeFormat } from '../../lib/helpers';

// Types
import { Basket, BasketItem } from '../../types/Basket';

// Components
import QuantityDropdown from '../../components/Inputs/QuantityDropdown';

// Style
import css from './basket.module.less';

interface Props {
  basket: Basket,
  handleChange: (
    event: ChangeEvent<HTMLSelectElement> | MouseEvent<HTMLButtonElement>,
    action: string, item: BasketItem
  ) => void
}

function BasketSummary(props: Props): ReactElement {
  const { basket, handleChange } = props;
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
          {basket.items.length > 0 ? (
            <>
              {basket.items.map((item) => (!item.details ? null : (
                <tr key={`${item.productSlug}-${item.deliveryDate}`}>
                  <td className={css.tableCell}>
                    <Link to={`/product/${item.details.slug}`}>
                      {item.details.name}
                    </Link>
                    <div className={css.furtherItemDetails}>
                      {`${capitalise(item.deliveryType)}`}
                      {item.deliveryDate !== '' && ` // ${rangeFormat(item.deliveryDate, { code: true })}`}
                    </div>
                  </td>
                  <td className={css.tableCell}>
                    <div className="form-row">
                      <div className="col-xs">
                        <QuantityDropdown
                          strValue={`${item.quantity}`}
                          name={`update|${item.productSlug}`}
                          handleChange={(e) => handleChange(e, 'update', item)}
                        />
                      </div>
                      <div className="col-sm-auto">
                        <button
                          className="btn btn-link form-control"
                          type="button"
                          name={`remove|${item.productSlug}`}
                          onClick={(e) => handleChange(e, 'remove', item)}
                        >
                          <img src="/icons/delete.svg" alt="Remove item from basket" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className={css.tableCellAmount}>{priceFormat(item.details.grossPrice)}</td>
                  <td className={css.tableCellAmount}>{priceFormat(item.linePrice)}</td>
                </tr>
              )))}
              {Object.keys(basket.delivery.details).map((key) => (
                <tr key={`DELIVERY-${key}`}>
                  <td className={css.tableCell}>
                    Delivery //&nbsp;
                    {rangeFormat(key, { code: true, times: false })}
                  </td>
                  <td className={css.tableCell}>1</td>
                  <td className={css.tableCellAmount}>
                    {priceFormat(props.basket.delivery.details[key].total)}
                  </td>
                  <td className={css.tableCellAmount}>
                    {priceFormat(props.basket.delivery.details[key].total)}
                  </td>
                </tr>
              ))}
              <tr>
                <th className={css.bottomLine} colSpan={3}>DELIVERY TOTAL</th>
                <td className={css.bottomLine}>
                  {basket.statement && priceFormat(
                    basket.statement.bottomLine.totalDelivery
                  )}
                </td>
              </tr>
              <tr>
                <th className={css.bottomLine} colSpan={3}>MOMS TOTAL</th>
                <td className={css.bottomLine}>
                  {basket.statement && priceFormat(
                    basket.statement.bottomLine.totalMoms,
                    { includeOre: true }
                  )}
                </td>
              </tr>
              <tr>
                <th className={css.bottomLine} colSpan={3}>TOTAL</th>
                <td className={css.bottomLine}>
                  {basket.statement && priceFormat(
                    basket.statement.bottomLine.totalPrice
                  )}
                </td>
              </tr>
            </>
          ) : (
            <tr key="noItems">
              <td className={css.emptyBasketText} colSpan={4}>
                NO ITEMS IN BASKET
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default BasketSummary;
