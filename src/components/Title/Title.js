import React from 'react';
import BasketIcon from '../BasketIcon/BasketIcon';
import css from './title.module.less';

function Title() {
  return (
    <>
      <div className={css.pageHeader}>
        <BasketIcon invisible />
        <h1 className={css.pageTitle}>Store</h1>
        <BasketIcon />
      </div>
    </>
  );
}

export default Title;
