declare namespace PaymentEntryModuleLessNamespace {
  export interface IPaymentEntryModuleLess {
    errors: string;
    message: string;
  }
}

declare const PaymentEntryModuleLessModule: PaymentEntryModuleLessNamespace.IPaymentEntryModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PaymentEntryModuleLessNamespace.IPaymentEntryModuleLess;
};

export = PaymentEntryModuleLessModule;
