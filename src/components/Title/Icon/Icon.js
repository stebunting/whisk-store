import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './icon.module.less';

function Icon({
  link,
  imgSrc,
  description,
  invisible
}) {
  return (
    <div
      className={css.icon}
      style={{ visibility: invisible ? 'hidden' : 'visible' }}
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
Icon.propTypes = {
  link: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  invisible: PropTypes.bool
};
Icon.defaultProps = {
  invisible: false
};

export default Icon;
