// Types
import { Basket } from './Basket';
import { Product } from './Product';
import { User } from './User';
import { FormValidity } from './FormValidity';
import { Delivery } from './Delivery';

export interface AppState {
  basket: Basket,
  products: Array<Product>,
  delivery: Delivery,
  user: User,
  validity: FormValidity,
  apiCallsInProgress: number
}
