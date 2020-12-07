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
  return (
    <div
      className={css.icon}
      style={{ visibility: props.visible ? 'visible' : 'hidden' }}
    >
      <Link to={props.link}>
        <img
          src={`/icons/${props.imgSrc}`}
          alt={props.description}
        />
      </Link>
    </div>
  );
}

export default Icon;
