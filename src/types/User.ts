export interface User {
  [key: string]: string | number | boolean | null,
  address: string,
  allCollections: boolean,
  deliveryNotes: string,
  name: string,
  email: string,
  telephone: string,
  notes: string,
  paymentMethod: string
}
