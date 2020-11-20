import React from 'react';
import Icon from './Icon/Icon';
import css from './title.module.less';

function Title() {
  return (
    <>
      <div className={css.pageHeader}>
        <Icon
          link="/"
          imgSrc="basket.svg"
          description="View Basket"
          invisible
        />
        <Icon
          link="/"
          imgSrc="basket.svg"
          description="View Basket"
          invisible
        />
        <h1 id="pageTitle" className={css.pageTitle}>Store</h1>
        <Icon
          link="/"
          imgSrc="store.svg"
          description="Go to Store Front"
        />
        <Icon
          link="/basket"
          imgSrc="basket.svg"
          description="View Basket"
        />
      </div>
    </>
  );
}

export default Title;
