export enum ESeadaObjectType {
    TEMPLATES = 'templates',
    LAYOUTS = 'layouts',
    ROUTES = 'routes',
    OVERRIDES = 'overrides',
}

export interface IPageComponentDefinition<
    TProps extends Record<string, any> = Record<string, any>,
    TProvidersData extends Record<string, any> = Record<string, any>
> {
    id: string;
    type: string;
    label: string;
    props?: TProps; // Props before middlewares transformation
    providedProps?: TProps; // Props after middlewares transformation
    providersData?: TProvidersData; // Data provided by data providers
    providersPropsDependencies?: string[]; // List of props that may change the providers data result
    children?: IPageComponentDefinition[];
}

export interface IComponentsContainer {
    components: IPageComponentDefinition[];
}

export interface IPageTemplateDefinition extends IComponentsContainer {
    areaCode: string;
    pageType: string;
    pageVariant: string;
    layout: string;
}

export interface IPageLayoutDefinition extends IComponentsContainer {
    areaCode: string;
    templateName: string;
}

export interface IPageRouteDefinition {
    path: string;
    pageType: string;
}

export interface IPageOverrideDefinition {
    path: string;
    template: string;
}

export interface IRoutesMapDefinition {
    routes: IPageRouteDefinition[];
}

export interface IOverridesMapDefinition {
    overrides: IPageOverrideDefinition[];
}
