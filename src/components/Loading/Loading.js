import React from 'react';
import PropTypes from 'prop-types';

function Loading({ children }) {
  return (
    <div>
      {children}
      Loading Store...
    </div>
  );
}
Loading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Loading;
