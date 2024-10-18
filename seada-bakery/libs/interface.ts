export type IInjectableValue = string | number | IInjectable | object;

export enum IInjectableType {
    String = 'string',
    Number = 'number',
    Reference = 'reference',
    LazyReference = 'lazy',
    DynamicReference = 'dynamic',
    Array = 'array',
    Map = 'map',
    Raw = 'raw',
}

export interface IInjectable {
    type?: IInjectableType;
    value: IInjectableValue | IInjectableValue[];
}

export interface IPluginDefinition {
    export: string;
    sort?: number;
}

export interface IPluginDefinitionsCollection {
    [key: string]: IPluginDefinition[];
}

export interface IInjectablesCollection {
    [key: string]: IInjectable;
}

export interface IInjection {
    [key: string]: Record<string, string>;
}

export interface IInjectionsCollection {
    [key: string]: IInjection;
}

export interface IPluginsCollection {
    [key: string]: IPluginDefinitionsCollection;
}

export interface IParsedReference {
    moduleName: string;
    exportName?: string;
}

export type IParsedInjectable = IParsedReference | string | number | object | IParsedInjectable[];

export interface IPackageJson extends Record<string, any> {
    'seada.io'?: {
        injectables?: IInjectablesCollection;
        injections?: IInjectionsCollection;
        plugins?: IPluginsCollection;
    };
}

export interface ITsConfigJson extends Record<string, any> {}

export interface IModuleInfo {
    modulePath: string;
    generatedPath: string;
    sourcePath: string;
    packageJson: IPackageJson;
    tsconfigJson: ITsConfigJson;
}

export interface IModulesCollection {
    [key: string]: IModuleInfo;
}
