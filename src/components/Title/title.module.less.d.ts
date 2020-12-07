declare namespace TitleModuleLessNamespace {
  export interface ITitleModuleLess {
    pageHeader: string;
    pageTitle: string;
  }
}

declare const TitleModuleLessModule: TitleModuleLessNamespace.ITitleModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TitleModuleLessNamespace.ITitleModuleLess;
};

export = TitleModuleLessModule;
