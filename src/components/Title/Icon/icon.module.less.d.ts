declare namespace IconModuleLessNamespace {
  export interface IIconModuleLess {
    icon: string;
  }
}

declare const IconModuleLessModule: IconModuleLessNamespace.IIconModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IconModuleLessNamespace.IIconModuleLess;
};

export = IconModuleLessModule;
