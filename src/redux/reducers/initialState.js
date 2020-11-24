export default {
  basket: {
    basketId: '',
    delivery: {
      address: '',
      deliverable: false,
      deliveryTotal: 0,
      details: {},
      momsRate: 25,
      zone: -1
    },
    items: [],
    statement: {
      bottomLine: {
        totalDelivery: 0,
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
