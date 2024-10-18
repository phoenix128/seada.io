import { IPageLayoutDefinition, IPageTemplateDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IVariables } from '@seada.io/core/spi/components/interface';

export interface IPageRouterHandler {
    (request: IPageRouterRequest, areaDefinition: ICorePageRouterAreaDefinition): Promise<IPageRouterResponse | null>;
}

export interface IAdapterRouterHandler {
    (
        request: IPageRouterRequest,
        areaDefinition: ICorePageRouterAreaDefinition,
        sourceId: string
    ): Promise<IPageRouterResponse | null>;
}

export interface ISourceInfo {
    id: string;
    type: string;
}

// Minimum core response with area definition to pass to seadas router handlers
export interface ICorePageRouterAreaDefinition {
    sourceIds: Record<string, string>; // Source IDs by port classes
    sourceAdaptersByIds: Record<string, string>; // Source adapters by source IDs
    areaCode: string; // Area code
    areaPath: string; // Base are path
    relativePath: string; // Path relative to area
    pagePath: string; // Full page path
    locale: string; // Area locale
    allLocales: string[]; // All available locales
    cookies: Record<string, string>;
    searchParams: Record<string, string>;
}

// Response from seadas router handlers
export interface IPageRouterResponse extends Partial<ICorePageRouterAreaDefinition> {
    pageType: string; // Page type (category, product, etc.)
    pageTemplate: IPageTemplateDefinition;
    locale?: string;
    allLocales?: string[]; // All available locales
    variables?: IVariables;
}

// Response from core router handler (with area definition and page data)
export interface ICorePageRouterResponse extends ICorePageRouterAreaDefinition {
    pageType: string; // Page type (category, product, etc.)
    pageTemplate: IPageTemplateDefinition;
    pageLayout: IPageLayoutDefinition;
    variables: IVariables;
    allLocales: string[]; // All available locales
    locale: string;
}

export interface IPageRouterRequest {
    path: string[];
    searchParams: Record<string, string>;
    cookies: Record<string, string>;
}

export interface INextRequest {
    params: {
        path: string[];
    };
    searchParams: Record<string, string>;
}
