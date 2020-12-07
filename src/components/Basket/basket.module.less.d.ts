declare namespace BasketModuleLessNamespace {
  export interface IBasketModuleLess {
    bottomLine: string;
    emptyBasketText: string;
    furtherItemDetails: string;
    tableCell: string;
    tableCellAmount: string;
  }
}

declare const BasketModuleLessModule: BasketModuleLessNamespace.IBasketModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BasketModuleLessNamespace.IBasketModuleLess;
};

export = BasketModuleLessModule;
