import { GaEcommerceItem } from './GaEcommerceItem';

export interface GaEcommerceEvent {
  event: string,
  ecommerce: {
    currency?: 'SEK',
    items?: Array<GaEcommerceItem>,
    purchase?: {
      transaction_id?: string,
      affiliation?: string,
      value: string,
      tax?: string,
      shipping?: string,
      currency: 'SEK',
      items: Array<GaEcommerceItem>
    }
  }
}
