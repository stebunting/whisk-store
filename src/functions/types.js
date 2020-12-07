import PropTypes from 'prop-types';

export const productType = PropTypes.shape({
  productId: PropTypes.string,
  slug: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
  details: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.string,
    description: PropTypes.string
  })),
  grossPrice: PropTypes.number
});

export const statementType = PropTypes.shape({
  bottomLine: PropTypes.shape({
    totalMoms: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  })
});

export const basketType = PropTypes.shape({
  basketId: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    quantity: PropTypes.number,
    deliveryDate: PropTypes.string,
    deliveryType: PropTypes.string
  })),
  statement: statementType
});

export const userType = PropTypes.shape({
  paymentMethod: PropTypes.string,
  address: PropTypes.string,
  verifiedAddress: PropTypes.string,
  zone: PropTypes.number,
  deliveryNotes: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  telephone: PropTypes.string,
  notes: PropTypes.string
});

export const validityType = PropTypes.shape({
  address: PropTypes.bool,
  name: PropTypes.bool,
  email: PropTypes.bool,
  telephone: PropTypes.bool
})