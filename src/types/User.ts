export interface User {
  address: string,
  verifiedAddress: string | null,
  zone: number,
  deliverable: boolean,
  allCollections: boolean,
  deliveryNotes: string,
  name: string,
  email: string,
  telephone: string,
  notes: string,
  paymentMethod: string
}
