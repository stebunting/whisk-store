// Types
import { ReduxState } from '../types/ReduxState';

const initialState: ReduxState = {
  basket: {
    basketId: '',
    delivery: {
      address: '',
      deliveryRequired: false,
      deliverable: false,
      deliveryTotal: 0,
      momsRate: 25,
      zone: -1,
      details: {}
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
  delivery: {
    address: '',
    zone: -1,
    deliverable: false,
    deliveryRequired: false
  },
  user: {
    address: '',
    deliveryNotes: '',
    name: '',
    email: '',
    telephone: '',
    notes: '',
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

export default initialState;
