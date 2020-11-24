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
  items: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    deliveryDate: PropTypes.string.isRequired,
    deliveryType: PropTypes.string.isRequired
  })).isRequired,
  statement: statementType
});

export const userType = PropTypes.shape({
  paymentMethod: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  verifiedAddress: PropTypes.string,
  zone: PropTypes.number.isRequired,
  deliveryNotes: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
});

export const validityType = PropTypes.shape({
  address: PropTypes.bool,
  name: PropTypes.bool,
  email: PropTypes.bool,
  telephone: PropTypes.bool
})