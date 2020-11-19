import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './basketIcon.module.less';

function BasketIcon({ invisible }) {
  return (
    <div
      className={css.basketIcon}
      style={{ visibility: invisible ? 'hidden' : 'visible' }}
    >
      <Link
        to="/basket"
      >
        <img
          src="/icons/basket.svg"
          alt="View Basket"
        />
      </Link>
    </div>
  );
}
BasketIcon.propTypes = {
  invisible: PropTypes.bool
};
BasketIcon.defaultProps = {
  invisible: false
};

export default BasketIcon;
