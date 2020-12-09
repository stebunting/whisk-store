export interface SwishResponse {
  id: string,
  paymentReference: string,
  payeePaymentReference: string,
  callbackUrl: string,
  payeeAlias: string,
  payerAlias: string,
  message: string,
  amount: number,
  currency: 'SEK',
  dateCreated: string,
  datePaid: string | null,
  errorCode: string | null,
  errorMessage: string | null,
  status: 'PAID' | 'DECLINED' | 'ERROR' | 'CANCELLED'
}
