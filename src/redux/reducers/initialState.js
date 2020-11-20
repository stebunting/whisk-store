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
    deliveryType: 'collection',
    paymentMethod: 'swish',
    date: 'undefined',
    address: '',
    verifiedAddress: null,
    zone: -1,
    deliverable: false,
    deliveryNotes: '',
    name: '',
    email: '',
    telephone: ''
  },
  apiCallsInProgress: 0
};
