// Types
import { Basket } from './Basket';
import { Product } from './Product';
import { User } from './User';
import { FormValidity } from './FormValidity';

export interface ReduxState {
  basket: Basket,
  products: Array<Product>,
  user: User,
  validity: FormValidity,
  apiCallsInProgress: number
}
