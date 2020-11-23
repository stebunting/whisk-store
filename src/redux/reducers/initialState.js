export default {
  basket: {
    basketId: '',
    items: [],
    statement: {
      bottomLine: {
        totalMoms: 0,
        totalPrice: 0
      }
    }
  },
  products: [],
  user: {
    address: '',
    verifiedAddress: null,
    zone: -1,
    deliverable: false,
    deliveryNotes: '',
    name: '',
    email: '',
    telephone: '',
    paymentMethod: 'swish'
  },
  validity: {
    address: null,
    name: null,
    email: null,
    telephone: null
  },
  apiCallsInProgress: 0
};
