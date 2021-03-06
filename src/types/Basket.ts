import { Product } from './Product';
import { Statement } from './Statement';

export interface BasketItem {
  deliveryDate: string,
  deliveryType: string,
  name: string,
  productSlug: string,
  grossPrice: number,
  linePrice: number,
  momsRate: number,
  quantity: number,
  details: Product
}

export interface Basket {
  basketId: string,
  items: Array<BasketItem>,
  delivery: {
    address: string,
    deliveryRequired: boolean,
    deliverable: boolean,
    deliveryTotal: number,
    momsRate: number,
    zone: number,
    details: {
      [dateCode: string]: {
        deliverable: boolean,
        maxZone: number,
        momsRate: number,
        total: number,
        products: Array<{
          slug: string,
          quantity: number,
          deliveryCost: number
        }>
      }
    }
  }
  statement: Statement

  // THIS IS THE SAME AS BASKETID, CAN BE REMOVED
  _id?: string,
}
