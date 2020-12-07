declare namespace StoreFrontModuleLessNamespace {
  export interface IStoreFrontModuleLess {
    productImage: string;
    productItem: string;
    productList: string;
    welcomeText: string;
  }
}

declare const StoreFrontModuleLessModule: StoreFrontModuleLessNamespace.IStoreFrontModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StoreFrontModuleLessNamespace.IStoreFrontModuleLess;
};

export = StoreFrontModuleLessModule;
