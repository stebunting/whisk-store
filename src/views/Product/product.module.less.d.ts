declare namespace ProductModuleLessNamespace {
  export interface IProductModuleLess {
    contentsList: string;
    description: string;
    ingredientsList: string;
    productHeader: string;
    productImage: string;
    productImages: string;
    productText: string;
  }
}

declare const ProductModuleLessModule: ProductModuleLessNamespace.IProductModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ProductModuleLessNamespace.IProductModuleLess;
};

export = ProductModuleLessModule;
