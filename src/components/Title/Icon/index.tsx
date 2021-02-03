// Requirements
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Style
import css from './icon.module.less';

interface Props {
  link: string,
  imgSrc: string,
  description: string,
  visible: boolean
}

function Icon(props: Props): ReactElement {
  const {
    link,
    imgSrc,
    description,
    visible
  } = props;

  return (
    <div
      className={css.icon}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      <Link to={link}>
        <img
          src={`/icons/${imgSrc}`}
          alt={description}
        />
      </Link>
    </div>
  );
}

export default Icon;
