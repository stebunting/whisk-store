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

export const userType = PropTypes.shape({
  deliveryType: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  verifiedAddress: PropTypes.string,
  zone: PropTypes.number.isRequired,
  deliverable: PropTypes.bool.isRequired,
  deliveryNotes: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
});

export const validityType = PropTypes.shape({
  date: PropTypes.bool,
  address: PropTypes.bool,
  name: PropTypes.bool,
  email: PropTypes.bool,
  telephone: PropTypes.bool
})