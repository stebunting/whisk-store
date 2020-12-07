// Requirements
import React, { ReactElement } from 'react';

// Components
import Icon from './Icon';

// Style
import css from './title.module.less';

function Title(): ReactElement {
  return (
    <>
      <div className={css.pageHeader}>
        <Icon
          link="/"
          imgSrc="basket.svg"
          description="View Basket"
          visible={false}
        />
        <Icon
          link="/"
          imgSrc="basket.svg"
          description="View Basket"
          visible={false}
        />
        <h1 id="pageTitle" className={css.pageTitle}>Store</h1>
        <Icon
          link="/"
          imgSrc="store.svg"
          description="Go to Store Front"
          visible
        />
        <Icon
          link="/basket"
          imgSrc="basket.svg"
          description="View Basket"
          visible
        />
      </div>
    </>
  );
}

export default Title;
