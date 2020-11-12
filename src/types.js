import PropTypes from 'prop-types';

export const productType = PropTypes.shape({
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  grossPrice: PropTypes.number.isRequired
});

export const statementType = PropTypes.shape({
  bottomLine: PropTypes.shape({
    totalMoms: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  })
});

export const basketType = PropTypes.shape({
  basketId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(productType).isRequired,
  statement: statementType
});
